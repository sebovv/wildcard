using Api.RequestHelpers;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    protected async Task<ActionResult> CreatePagedResult<T>(
        IGenericRepository<T> repo,
        ISpecification<T> specification,
        int pageIndex,
        int pageSize
        ) where T : BaseEntity
    {
        var items = await repo.ListAllAsync(specification);
        int count = await repo.CountAsync(specification);
        return Ok(new Pagination<T>(pageIndex, pageSize, count, items));
    }
}