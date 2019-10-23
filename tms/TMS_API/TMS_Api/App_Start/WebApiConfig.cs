using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace TMS_Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            //   config.EnableCors(new EnableCorsAttribute("http://localhost:4200", headers: "*", methods: "*"));
            // Web API routes
            var cors = new EnableCorsAttribute("http://localhost:4200", headers: "*", methods: "*");//origins,headers,methods   
            config.EnableCors(cors);
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "trainees",
                routeTemplate: "api/{controller}/{action}/{activationcode}",
                defaults: new { activationcode = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "mentors",
                routeTemplate: "api/{controller}/{action}/{activationcode}",
                defaults: new { activationcode = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute(
                name: "ActiontApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
