using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IGenericRepository<Product> repo) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts(
        string? brand,
        string? type,
        string? sort)
    {
        var specification = new ProductSpecification(brand, type, sort);
        var products = await repo.ListAllAsync(specification);
        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        Product? product = await repo.GetByIdAsync(id);

        if (product is null)
        {
            return NotFound();
        }

        return product;
    }

    [HttpGet]
    [Route("brands")]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetBrands()
    {
        var specification = new BrandListSpecification();
        var brands = await repo.ListAllAsync(specification);
        return Ok(brands);
    }

    [HttpGet("types")]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetTypes()
    {
        var specification = new TypeListSpecification();
        var types = await repo.ListAllAsync(specification);
        return Ok(types);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromBody]
    Product product)
    {
        repo.Add(product);

        if (await repo.SaveAllAsync())
        {
            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        return BadRequest("Problem with creating product");
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateProduct(int id, Product product)
    {
        if (product.Id != id || !repo.Exists(id))
        {
            return BadRequest($"Cannot update product with id: {id}");
        }

        repo.Update(product);

        if (await repo.SaveAllAsync())
        {
            return NoContent();
        }

        return BadRequest("Problem update product");
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        Product? product = await repo.GetByIdAsync(id);
        if (product is null)
        {
            return NotFound();
        }

        repo.Remove(product);

        if (await repo.SaveAllAsync())
        {
            return NoContent();
        }

        return BadRequest("Problem deleting product");
    }
}