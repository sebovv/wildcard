using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class CartController(ICartService cartService) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<ShoppingCart>> GetCartById(string id)
    {
        var cart = await cartService.GetCartAsync(id);
        return Ok(cart ?? new ShoppingCart() { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<ShoppingCart>> SetCartById(ShoppingCart cart)
    {
        var updatedCart = await cartService.SetCartAsync(cart);

        if (updatedCart == null)
        {
            return BadRequest("Problem with the cart");
        }

        return Ok(updatedCart);
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteCart(string id)
    {
        var deleteResult = await cartService.DeleteCartAsync(id);
        if (!deleteResult)
        {
            return BadRequest("Problem deleting cart");
        }
        return Ok();
    }
}