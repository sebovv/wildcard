using System.Net;
using System.Text.Json;
using Api.Errors;

namespace Api.Middleware;

public class ExceptionMiddleware(IHostEnvironment environment, RequestDelegate next)
{
    private readonly JsonSerializerOptions _options = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            await HandleException(context, ex, environment);
        }
    }

    private async Task HandleException(HttpContext context, Exception ex, IHostEnvironment environment)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var response = environment.IsDevelopment()
            ? new ApiErrorResponse(context.Response.StatusCode, ex.Message, ex.StackTrace)
            : new ApiErrorResponse(context.Response.StatusCode, ex.Message, "Internal Server Error");

        var json = JsonSerializer.Serialize(response, _options);

        await context.Response.WriteAsJsonAsync(json);
    }
}