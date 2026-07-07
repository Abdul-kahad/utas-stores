const XLSX = require('xlsx');
const Item = require('../models/Item');

const importExcelInventory = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Please upload an Excel spreadsheet (.xlsx)" });
        }

        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        
        // FIX: Access the first sheet safely
        const firstSheetName = workbook.SheetNames;
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);

        if (sheetData.length === 0) {
            return res.status(400).json({ message: "The uploaded spreadsheet contains no data rows." });
        }

        let itemsCreated = 0;
        let itemsUpdated = 0;

        for (const row of sheetData) {
            const name = row['Item Name']?.toString().trim();
            const category = row['Category']?.toString().trim() || 'General';
            const unit = row['Unit']?.toString().trim() || 'Pcs';
            const reorderLevel = parseInt(row['Reorder Level'], 10) || 0;

            if (!name) continue;

            // FIX: Escape special characters (like '(' or '+') so Regex doesn't break
            const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
            // Search case-insensitive
            let item = await Item.findOne({ name: { $regex: new RegExp(`^${escapedName}$`, 'i') } });

            if (item) {
                item.category = category;
                item.unit = unit;
                if (row['Reorder Level'] !== undefined) item.reorderLevel = reorderLevel;
                
                await item.save();
                itemsUpdated++;
            } else {
                await Item.create({
                    name,
                    category,
                    unit,
                    quantity: 0, 
                    reorderLevel
                });
                itemsCreated++;
            }
        }

        return res.status(200).json({
            message: "Store item catalog synchronized successfully!",
            summary: {
                totalRowsParsed: sheetData.length,
                newItemsRegistered: itemsCreated,
                existingItemConfigsUpdated: itemsUpdated
            }
        });

    } catch (error) {
        console.error("Excel processing failure:", error);
        return res.status(500).json({ 
            message: "Failed to parse spreadsheet.", 
            error: error.message 
        });
    }
};

module.exports = { importExcelInventory };