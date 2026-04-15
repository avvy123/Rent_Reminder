using backend.Models;

public class Payment
{
    public int Id { get; set; }
    public int TenantId { get; set; }
    public int Amount { get; set; }
    public DateTime PaidDate { get; set; }
    public string Method { get; set; }
}