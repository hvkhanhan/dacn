using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using System.Web.Routing;
using TMS_Api.Models;

namespace TMSDemo.Controllers
{
    public class traineesController : ApiController
    {

        private tmsdbEntities1 db = new tmsdbEntities1();

        #region Get All Trainees
        [System.Web.Http.Route("api/trainees/Gettraineesall")]
        [System.Web.Http.HttpGet]
        public System.Object Gettraineesall()
        {
            var v = (from t in db.trainees

                     select new
                     {
                         t.traineeid,
                         t.name,
                         t.email,
                         t.phone,
                         t.address,
                         t.isActive,
                         t.password,
                         t.activationcode,
                         t.resetpasswordcode
                     }).ToList();
            return v;
        }
        #endregion

        public static string GetMD5(string str)
        {

            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();

            byte[] bHash = md5.ComputeHash(Encoding.UTF8.GetBytes(str));

            StringBuilder sbHash = new StringBuilder();

            foreach (byte b in bHash)
            {

                sbHash.Append(String.Format("{0:x2}", b));

            }

            return sbHash.ToString();

        }

        #region Get 1 trainee

        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/trainees/Gettrainee/{id}")]
        [ResponseType(typeof(trainee))]
        public IHttpActionResult Gettrainee(int id)
        {
            trainee trainee = db.trainees.Find(id);
            if (trainee == null)
            {
                return NotFound();
            }

            return Ok(trainee);
        }
        #endregion



        #region Update Trainee
        // PUT: api/trainees/5
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.AcceptVerbs("GET", "PUT")]
        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("api/trainees/Puttrainee/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttrainee(int id, trainee trainee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != trainee.traineeid)
            {
                return BadRequest();
            }

            db.Entry(trainee).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!traineeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        #endregion


        #region Add Trainee

        [ResponseType(typeof(trainee))]
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.Route("api/trainees/Posttrainee", Name = "Posttrainee")]
        public IHttpActionResult Posttrainee(trainee trainee)
        {

            var v = from t in db.trainees select t;
            Random random = new Random();
            string activationCode = random.Next(100000, 999999).ToString();
            foreach (var item in v)
            {
                if (item.email == trainee.email)
                {
                    return BadRequest();
                }
            }

            db.trainees.Add(new trainee()
            {

                name = trainee.name,
                email = trainee.email,
                phone = trainee.phone,
                address = trainee.address,
                isActive = 0,
                password = GetMD5(trainee.password),
                activationcode = activationCode.ToString(),
            });
            SmtpClient client = new SmtpClient();
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.EnableSsl = true;
            client.Host = "smtp.gmail.com";
            client.Port = 587;
            // setup Smtp authentication
            System.Net.NetworkCredential credentials =
                new System.Net.NetworkCredential("thuongmaidientu7102018@gmail.com", "0966117765qwer");
            client.UseDefaultCredentials = false;
            client.Credentials = credentials;
            //can be obtained from your model
            MailMessage msg = new MailMessage();
            msg.From = new MailAddress("thuongmaidientu7102018@gmail.com");
            msg.To.Add(new MailAddress(trainee.email)); // Truyền người nhận

            msg.Subject = "[TMS_PROJECT]_[" + trainee.email + "]_Cảm ơn bạn đã quan tâm!"; // Tiêu đề
            msg.IsBodyHtml = true;

            msg.Body += string.Format("<html><head></head><body><b>Click Link to CONFIRM EMAIL: </b></body>");// Nội dung mail
            msg.Body += "<br /><a href = '" + string.Format("http://localhost:59786/api/trainees/ActiveEmail/?activationcode={0}", activationCode) + "'>Click here to activate your account.</a>";

            client.Send(msg);

            db.SaveChanges();
            return CreatedAtRoute("Posttrainee", new { id = trainee.traineeid }, trainee);
        }

        #endregion


        #region Active Email
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpPost]
        [ResponseType(typeof(trainee))]
        public HttpResponseMessage ActiveEmail(string ActivationCode)
        {
            var resp = Request.CreateResponse(HttpStatusCode.BadRequest, "Email is Actived. Please try again!");
            var response = Request.CreateResponse(HttpStatusCode.Created, "Active Successfully!");
            var a = from t in db.trainees select t;
            var v = db.trainees.Where(e => e.activationcode == ActivationCode).FirstOrDefault<trainee>();


            Guid originalGuid = Guid.NewGuid();
            string guild = originalGuid.ToString("D");
            foreach (var item in a)
            {
                if (item.activationcode.Length > 6)
                {
                    return resp;
                }
            }

            Guid newGuid = Guid.Parse(guild);
            v.isActive = 1;
            v.activationcode = newGuid.ToString();

            db.SaveChanges();
            return response;

        }

        #endregion



        #region Login
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [ResponseType(typeof(trainee))]
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.Route("api/trainees/Login")]
        public IHttpActionResult Login(string Email, string Password)
        {
            var v = from t in db.trainees select t;
            foreach (var item in v)
            {
                if (item.email == Email && item.password == GetMD5(Password) && item.isActive == 1)
                    return Ok(item);
            }
            return NotFound();
        }

        #endregion


        #region Method ForgotPassword
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/trainees/ForgotPassword")]
        public IHttpActionResult ForgotPassword(string Email)
        {
            var v = from t in db.trainees
                    where t.email == Email
                    select t;


            if (v.Count() < 1)
            {
                return NotFound();
            }

            Random random = new Random();
            string resetPasswordCode = random.Next(100000, 999999).ToString();

            SmtpClient client = new SmtpClient();
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.EnableSsl = true;
            client.Host = "smtp.gmail.com";
            client.Port = 587;
            // setup Smtp authentication
            System.Net.NetworkCredential credentials =
                new System.Net.NetworkCredential("thuongmaidientu7102018@gmail.com", "0966117765qwer");
            client.UseDefaultCredentials = false;
            client.Credentials = credentials;
            //can be obtained from your model
            MailMessage msg = new MailMessage();
            msg.From = new MailAddress("aitiphoto02@gmail.com");
            msg.To.Add(new MailAddress(Email)); // Truyền người nhận

            msg.Subject = "[aitiphoto01]_[" + Email + "]_Cảm ơn bạn đã quan tâm!"; // Tiêu đề
            msg.IsBodyHtml = true;

            msg.Body += string.Format("<html><head></head><body><b>Copy <mark>CODE</mark> to Reset Password: </b></body>");// Nội dung mail
            msg.Body += "<br /><h1><b>" + resetPasswordCode + "</b></h1>";

            client.Send(msg);

            var a = db.trainees.Where(e => e.email == Email).FirstOrDefault<trainee>();
            a.resetpasswordcode = resetPasswordCode;
            db.SaveChanges();
            return Ok();
        }

        #endregion


        #region Reset Password
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/trainees/ResetPassword")]
        [ResponseType(typeof(trainee))]
        public IHttpActionResult ResetPassword(string resetPasswordCode, string Password)
        {
            Guid originalGuid = Guid.NewGuid();
            string guild = originalGuid.ToString("D");
            var v = from t in db.trainees select t;
            foreach (var item in v)
            {
                if (item.resetpasswordcode == resetPasswordCode)
                {
                    Guid newGuid = Guid.Parse(guild);
                    item.password = GetMD5(Password);
                    item.resetpasswordcode = newGuid.ToString();
                }
            }
            db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        #endregion


        #region Delete Trainee
        [System.Web.Http.HttpDelete]
        [ResponseType(typeof(trainee))]
        [System.Web.Http.Route("api/trainees/Deletetrainee/{id}")]
        public IHttpActionResult Deletetrainee(int id)
        {
            trainee trainee = db.trainees.Find(id);
            if (trainee == null)
            {
                return NotFound();
            }

            db.trainees.Remove(trainee);
            db.SaveChanges();

            return Ok(trainee);
        }

        #endregion


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool traineeExists(int id)
        {
            return db.trainees.Count(e => e.traineeid == id) > 0;
        }
    }
}