using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Manufacture.Models
{
    public class Cars //Displays the Class Here
    {
        [Key] 
        public int Id { get; set; } // Holds the Id of Car
        public string Name { get; set; } // Holds The Name of Car
        public string Model { get; set; } //Holds the Model of the Car
        public int Year { get; set; } //Holds the Year of Car Manufacture
        public string Color { get; set; } //Holds the color of Car
        
    }
}
