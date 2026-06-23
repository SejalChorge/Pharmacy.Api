namespace Pharmacy.Api.Models
{
    public class SaleRecord
    {
        public int Id { get; set; }

        public int MedicineId { get; set; }

        public int QuantitySold { get; set; }

        public DateTime SaleDate { get; set; }
    }
}
