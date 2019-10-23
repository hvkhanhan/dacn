using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Description;
using TMS_Api.Models;

namespace TMS.Controllers
{
    public class mentorsController : ApiController
    {
        private tmsdbEntities1 db = new tmsdbEntities1();
        #region Get All Mentor
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpGet]
        [Route("api/mentors/Getmentors")]
        public System.Object Getmentors()
        {
            var result = (from a in db.mentors
                          join b in db.skills on a.idskill equals b.idskill

                          select new
                          {
                              a.mentorid,
                              a.name,
                              a.email,
                              a.phone,
                              a.address,
                              a.isActive,
                              a.password,
                              b.idskill,
                              skill = b.skillname,
                              a.activationcode,
                              a.resetpasswordcode,
                          }).ToList();
            return result;
        }


        #endregion

        #region Getcoursefollowcategoryid
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpGet]
        [Route("api/mentors/Getcoursefollowskillid/{idskill}")]
        [ResponseType(typeof(course))]
        public System.Object Getcoursefollowskillid(int idskill)
        {
            var result = (from a in db.courses
                          join b in db.skills on a.idskill equals b.idskill
                          join e in db.trainees on a.trainee_course equals e.traineeid
                          where b.idskill == idskill
                          select new
                          {

                              a.courseid,
                              a.title,
                              a.description,
                              a.city,
                              a.address,
                              a.time,
                              a.createddate,
                              a.status,
                              b.idskill,
                              skill = b.skillname,
                              trainee = e.name
                          }).ToList();
            return result;
        }
        #endregion


        #region Get 1 Mentor
        // GET: api/mentors/5
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpGet]
        [Route("api/mentors/Getmentor/{id}")]
        [ResponseType(typeof(mentor))]
        public IHttpActionResult Getmentor(int id)
        {
            mentor mentor = db.mentors.Find(id);
            if (mentor == null)
            {
                return NotFound();
            }

            return Ok(mentor);
        }

        #endregion


        #region Update Mentor
        // PUT: api/mentors/5
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.AcceptVerbs("GET", "PUT")]
        [System.Web.Http.HttpPut]
        [Route("api/mentors/Putmentor/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult Putmentor(int id, mentor mentor)
        {


            if (id != mentor.mentorid)
            {
                return BadRequest();
            }

            db.Entry(mentor).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                if (!mentorExists(id))
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


        #region Create Mentor

        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.Route("api/mentors/Postmentor")]
        [HttpPost]
        [ResponseType(typeof(mentor))]
        public HttpResponseMessage Postmentor(mentor mentor)
        {
            var resp = Request.CreateResponse(HttpStatusCode.BadRequest, "Mail is registered. Please try again!");
            var response = Request.CreateResponse(HttpStatusCode.Created, "Register Successfully!");
            var result = from a in db.mentors
                         join b in db.skills on a.idskill equals b.idskill
                         select a;
            Random random = new Random();
            string activationCode = random.Next(100000, 999999).ToString();
            foreach (var item in result)
            {
                if (item.email == mentor.email)
                {
                    return resp;
                }
            }
            db.mentors.Add(new mentor
            {
                name = mentor.name,
                email = mentor.email,
                phone = mentor.phone,
                address = mentor.address,
                isActive = 0,
                password = mentor.password,
                idskill = mentor.idskill,
                isreceivenotification = 1,
                activationcode = activationCode.ToString()

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
            msg.To.Add(new MailAddress(mentor.email)); // Truyền người nhận

            msg.Subject = "[TMS_PROJECT]_[" + mentor.email + "]_Cảm ơn bạn đã quan tâm!"; // Tiêu đề
            msg.IsBodyHtml = true;

            msg.Body += string.Format("<html><head></head><body><b>Click Link to CONFIRM EMAIL: </b></body>");// Nội dung mail
            msg.Body += "<br /><a href = '" + string.Format("http://localhost:59786/api/mentors/ActiveEmail/?activationcode={0}", activationCode) + "'>Click here to activate your account.</a>";

            client.Send(msg);


            db.SaveChanges();

            return response;
        }
        #endregion



        #region Method Active Email
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        //[System.Web.Http.HttpPost]
        [ResponseType(typeof(mentor))]
        public IHttpActionResult ActiveEmail(string ActivationCode)
        {


            var a = from t in db.mentors select t;
            var v = db.mentors.Where(e => e.activationcode == ActivationCode).FirstOrDefault<mentor>();


            Guid originalGuid = Guid.NewGuid();
            string guild = originalGuid.ToString("D");
            foreach (var item in a)
            {
                if (item.activationcode.Length > 6)
                {
                    return NotFound();
                }
            }

            Guid newGuid = Guid.Parse(guild);
            v.isActive = 1;
            v.activationcode = newGuid.ToString();

            db.SaveChanges();
            return Ok();
        }

        #endregion


        #region Method Login

        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpGet]
        public IHttpActionResult Login(string Email, string Password)
        {
            var v = from t in db.mentors select t;
            foreach (var item in v)
            {
                if (item.email == Email && item.password == Password)
                    return Ok(item);
            }
            return NotFound();
        }
        #endregion


        #region Method ForgotPassword

        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/mentors/ForgotPassword")]
        [ResponseType(typeof(mentor))]
        public HttpResponseMessage ForgotPassword(string Email)
        {
            var resp = Request.CreateResponse(HttpStatusCode.BadRequest, "Mail is not registed. Please try again!");
            var response = Request.CreateResponse(HttpStatusCode.Created, "Sent mail. Please check mail!");

            var result = from a in db.mentors
                         join b in db.skills on a.idskill equals b.idskill
                         select a;

            foreach (var item in result)
            {
                if (item.email != Email)
                {
                    return resp;
                }
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
            msg.From = new MailAddress("thuongmaidientu7102018@gmail.com");
            msg.To.Add(new MailAddress(Email)); // Truyền người nhận

            msg.Subject = "[aitiphoto01]_[" + Email + "]_Cảm ơn bạn đã quan tâm!"; // Tiêu đề
            msg.IsBodyHtml = true;

            msg.Body += string.Format("<html><head></head><body><b>Click Link to Reset Password: </b></body>");// Nội dung mail
            msg.Body += "<br /><a href = '" + string.Format("http://localhost:59786/api/mentors/ResetPassword/?resetPasswordCode={0}", resetPasswordCode) + "'>Click here to RECOVERY your PASSWORD.</a>";

            client.Send(msg);

            var v = db.mentors.Where(e => e.email == Email).FirstOrDefault<mentor>();
            v.resetpasswordcode = resetPasswordCode;
            db.SaveChanges();
            return response;
        }

        #endregion


        #region Method ResetPassword
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpPost]
        [ResponseType(typeof(mentor))]
        public IHttpActionResult ResetPassword(string resetPasswordCode, string Password)
        {
            Guid originalGuid = Guid.NewGuid();
            string guild = originalGuid.ToString("D");
            var v = from t in db.mentors select t;
            foreach (var item in v)
            {
                if (item.resetpasswordcode == resetPasswordCode)
                {
                    Guid newGuid = Guid.Parse(guild);
                    item.password = Password;
                    item.resetpasswordcode = newGuid.ToString();
                }
            }
            db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }


        #endregion


        // DELETE: api/mentors/5
        [ResponseType(typeof(mentor))]
        public IHttpActionResult Deletementor(int id)
        {
            mentor mentor = db.mentors.Find(id);
            if (mentor == null)
            {
                return NotFound();
            }

            db.mentors.Remove(mentor);
            db.SaveChanges();

            return Ok(mentor);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool mentorExists(int id)
        {
            return db.mentors.Count(e => e.mentorid == id) > 0;
        }
    }
}