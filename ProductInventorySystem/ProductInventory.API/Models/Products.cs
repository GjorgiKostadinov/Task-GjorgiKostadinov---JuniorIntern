using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductInventory.API.Models
{
    [Table("products", Schema = "public")]
    public class Product
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        
        [Required]
        [Column("name")]
        public string Name { get; set; } = string.Empty;
        
        [Column("description")]
        public string? Description { get; set; }
        
        [Required]
        [Column("price")]
        [Range(0, double.MaxValue)]
        public double Price { get; set; }
        
        [Required]
        [Column("quantity_in_stock")]
        [Range(0, int.MaxValue)]
        public int QuantityInStock { get; set; }
        
        [Column("category")]
        public string? Category { get; set; }
        
        [Column("image_url")]
        public string? ImageUrl { get; set; }
    }
}