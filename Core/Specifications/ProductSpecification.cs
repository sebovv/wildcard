using Core.Entities;

namespace Core.Specifications;

public class ProductSpecification : BaseSpecification<Product>
{
    public ProductSpecification(ProductSpecificationParams specificationParams) : base(x =>
        (string.IsNullOrEmpty(specificationParams.Search) || x.Name.Contains(specificationParams.Search)) &&
        (!specificationParams.Brands.Any() || specificationParams.Brands.Contains(x.Brand)) &&
        (!specificationParams.Types.Any() || specificationParams.Types.Contains(x.Type)))
    {
        int skip = specificationParams.PageSize * (specificationParams.PageIndex - 1);
        int take = specificationParams.PageSize;
        ApplyPaging(skip, take);

        switch (specificationParams.Sort)
        {
            case "priceAsc":
                AddOrderBy(x => x.Price);
                break;

            case "priceDesc":
                AddOrderByDescending(x => x.Price);
                break;

            default:
                AddOrderBy(x => x.Name);
                break;
        }
    }
}