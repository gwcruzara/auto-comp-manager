﻿namespace PI.Domain.Models
{
    public class Penalties : BaseEntity
    {
        public string Description { get; set; } 
        public double Time { get; set; } 
        public int IdSpeed { get; set; } 
        public Speed Speed { get; set; } 
    }
}
