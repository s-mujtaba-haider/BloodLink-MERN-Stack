import jsPDF from "jspdf";
import "./CertificateGenerator.css";

const CertificateGenerator = ({ donorName, donationDate, bloodType, unitsDonated }) => {
    const generatePDF = () => {
        const pdf = new jsPDF("l", "mm", "a4"); // Landscape format

        // Styling
        pdf.setFont("Playfair Display", "bold");

        // Certificate Border
        pdf.setDrawColor(184, 134, 11); // Gold color
        pdf.setLineWidth(5);
        pdf.rect(10, 10, 277, 190); // Draw border

        // Certificate Title
        pdf.setFontSize(36);
        pdf.setTextColor(184, 134, 11); // Gold color
        pdf.text("Certificate of Appreciation", 148, 50, null, null, "center");

        // Subtitle
        pdf.setFontSize(18);
        pdf.setFont("Playfair Display", "normal");
        pdf.setTextColor(44, 62, 80); // Dark Blue
        pdf.text("This certificate is proudly presented to:", 148, 70, null, null, "center");

        // Donor Name
        pdf.setFontSize(28);
        pdf.setTextColor(139, 0, 0); // Deep Red
        pdf.setFont("Lobster", "bold");
        pdf.text(donorName, 148, 90, null, null, "center");

        // Certificate Body
        pdf.setFontSize(18);
        pdf.setTextColor(44, 62, 80); // Dark Blue
        pdf.setFont("Playfair Display", "normal");
        pdf.text("For their selfless act of donating blood and saving lives.", 148, 110, null, null, "center");

        pdf.text(`Blood Type: ${bloodType}`, 148, 130, null, null, "center");
        pdf.text(`Units Donated: ${unitsDonated}`, 148, 145, null, null, "center");
        pdf.text(`Date of Donation: ${donationDate}`, 148, 160, null, null, "center");

        // Footer
        pdf.setFontSize(20);
        pdf.setFont("Playfair Display", "italic");
        pdf.setTextColor(22, 160, 133); // Green
        pdf.text("Thank you for being a lifesaver!", 148, 190, null, null, "center");

        // Save PDF
        pdf.save(`Donor_Certificate_${donorName}.pdf`);
    };

    return (
        <button className="download-button" onClick={generatePDF}>
            Download Certificate
        </button>
    );
};

export default CertificateGenerator;
