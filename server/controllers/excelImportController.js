const XLSX = require('xlsx');
const Item = require('../models/Item');
const { logBusinessAction } = require('../utils/auditLogger')

const importExcelInventory = async (req, res) => {
    const currentUser = req.user;
    console.log(currentUser)
    const file = req.file
    try {
        if (!file) {
            return res.status(400).json({ message: "Please upload an Excel spreadsheet (.xlsx)" });
        }

        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        
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

        summary = {
                totalRowsParsed: sheetData.length,
                newItemsRegistered: itemsCreated,
                existingItemConfigsUpdated: itemsUpdated
            }

        await logBusinessAction({
            userId: currentUser.id,
            userEmail: currentUser.email,
            action: 'CATALOG_EXCEL_IMPORT',
            details: { 
                fileName: file.originalname,
                fileSize: file.size,
                summary: summary 
            },
            req
            });

        return res.status(200).json({
            message: "Store item catalog synchronized successfully!",
            summary
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