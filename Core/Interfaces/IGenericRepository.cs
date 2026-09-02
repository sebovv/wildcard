using Core.Entities;

namespace Core.Interfaces;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(int id);
    Task<IReadOnlyList<T>> ListAllAsync();
    Task<IReadOnlyList<T>> ListAllAsync(ISpecification<T> specification);
    Task<IReadOnlyList<TResult>> ListAllAsync<TResult>(ISpecification<T, TResult> specification);
    Task<T?> GetEntityWithSpecAsync(ISpecification<T> specification);
    Task<TResult?> GetEntityWithSpecAsync<TResult>(ISpecification<T, TResult> specification);
    void Add(T entity);
    void Update(T entity);
    void Remove(T entity);
    Task<bool> SaveAllAsync();
    bool Exists(int id);

}