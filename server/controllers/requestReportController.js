const PDFDocument = require('pdfkit');
const Request = require('../models/Request');

const downloadRequestPDF = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Fetch data and populate 'user' field from the 'User' collection
        const requestData = await Request.findById(id)
            .populate({ 
                path: 'user', 
                select: 'name email role', // Pull the name and email of the user
                options: { strictPopulate: false } 
            })
            .populate({ 
                path: 'items.item', 
                options: { strictPopulate: false } 
            });

        if (!requestData) {
            return res.status(404).json({ message: "Receipt dataset not found" });
        }

        // 2. Initialize PDF Document
        const doc = new PDFDocument({ margin: 50 });

        // 3. Set streaming headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Receipt_${id.slice(-6).toUpperCase()}.pdf`);

        doc.pipe(res);

        // ==========================================
        // 🖋️ PDF DESIGN LAYOUT GENERATION
        // ==========================================

        // Header Banner
        doc.fillColor('#4A5568').fontSize(20).text('UTAS STORES', { align: 'center' });
        doc.fontSize(10).text('Official Stores & Inventory Receipt', { align: 'center' });
        doc.moveDown(1);
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('#E2E8F0'); 
        doc.moveDown(1.5);

        // Request Metadata Details Block
        const receiptNo = `REQ-${id.slice(-6).toUpperCase()}`;
        doc.fillColor('#2D3748').fontSize(12).font('Helvetica-Bold').text(`Request ID: ${receiptNo}`);
        doc.font('Helvetica').fontSize(10).fillColor('#4A5568');
        
        // DISPLAY USER DETAILS INSTEAD OF DEPARTMENT
        doc.text(`Requested By: ${requestData.user?.name || 'Staff Member'}`);
        doc.text(`Email: ${requestData.user?.email || 'N/A'}`);
        doc.text(`Date Filed: ${requestData.createdAt ? new Date(requestData.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}`);
        doc.text(`Current Status: ${(requestData.status || 'Pending').toUpperCase()}`);
        doc.moveDown(2);

        // Document Items Section Title
        doc.font('Helvetica-Bold').fontSize(14).fillColor('#1A202C').text('Requested Items List');
        doc.moveDown(0.5);
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('#CBD5E1');
        doc.moveDown(0.5);

        // Table Row Headers Layout
        let currentY = doc.y;
        doc.font('Helvetica-Bold').fontSize(10);
        doc.text('Item Description', 55, currentY);
        doc.text('Category', 280, currentY);
        doc.text('Qty Req', 480, currentY);
        doc.moveDown(0.5);
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('#E2E8F0');
        doc.moveDown(0.5);

        // Loop using your exact item data array structure (.quantity)
        doc.font('Helvetica').fontSize(10);
        
        if (requestData.items && Array.isArray(requestData.items)) {
            requestData.items.forEach((entry) => {
                if (entry) {
                    let rowY = doc.y;
                    
                    const itemName = entry.item?.name || entry.itemName || 'Unknown Item';
                    const itemCategory = entry.item?.category || entry.category || 'General';
                    const rawQty = entry.quantity !== undefined ? entry.quantity : 0;

                    const nameStr = `${itemName}`;
                    const catStr = `${itemCategory}`;
                    const qtyStr = `${rawQty}`;

                    doc.text(nameStr, 55, rowY, { width: 200 });
                    doc.text(catStr, 280, rowY, { width: 150 });
                    doc.text(qtyStr, 480, rowY);
                    
                    doc.moveDown(1.2);
                }
            });
        } else {
            doc.text('No item registers verified on this receipt.', 55, doc.y);
        }

        doc.moveDown(2);
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('#CBD5E1');
        doc.moveDown(1);

        doc.fontSize(8).fillColor('#A0AEC0').text('Generated automatically via UTAS Store Management System (USMS)', { align: 'center' });

        doc.end();

    } catch (error) {
        console.error("PDF Generation Crash Log Context:", error);
        if (!res.headersSent) {
            res.status(500).json({ message: "Failed to construct printable binary file stream", error: error.message });
        }
    }
};

module.exports = { downloadRequestPDF };