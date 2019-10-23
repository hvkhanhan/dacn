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
    public class assignedsController : ApiController
    {
        private tmsdbEntities1 db = new tmsdbEntities1();

        #region Get  Assigneds Follow mentor
       
        
        [Route("api/assigneds/Getassignedsfollowmentor/{mentorid}")]
        public System.Object Getassignedsfollowmentor(int mentorid)
        {
            var v = (from t in db.assigneds
                     join a in db.mentors on t.mentorid equals a.mentorid
                     join b in db.courses on t.courseid equals b.courseid
                     join c in db.skills on b.idskill equals c.idskill
                     join d in db.trainees on b.trainee_course equals d.traineeid
                     where b.idskill == c.idskill && a.idskill == b.idskill && a.mentorid == t.mentorid && t.mentorid == mentorid
                     select new
                     {
                         a.mentorid,
                         course = b.title,
                         mentorname = a.name,
                         traineename = d.name,
                         t.courseid,
                         b.title,
                         t.startday,
                         t.endday,
                         t.address,
                         t.notes,
                         t.time
                     }).ToList();
            if (v.Count() < 1)
            {
                return NotFound();
            }
            return v;
        }

        #endregion

        #region Get  Assigneds follow trainee
       
       
        [Route("api/assigneds/Getassignedsfollowtrainee/{traineeid}")]
        public System.Object Getassignedsfollowtrainee(int traineeid)
        {
            var v = (from t in db.assigneds
                    join a in db.mentors on t.mentorid equals a.mentorid
                    join b in db.courses on t.courseid equals b.courseid
                    join c in db.skills on b.idskill equals c.idskill
                    join d in db.trainees on b.trainee_course equals d.traineeid
                    where b.idskill == c.idskill && a.idskill == b.idskill && a.mentorid == t.mentorid && b.trainee_course == traineeid
                    select new
                    {
                        a.mentorid,
                        course = b.title,
                        mentorname = a.name,
                        traineename = d.name,
                        t.courseid,
                        b.title,
                        t.startday,
                        t.endday,
                        t.address,
                        t.notes,
                        t.time
                    }).ToList();
            if (v.Count() < 1)
            {
                return NotFound();
            }

            return v;
        }

        #endregion

        // GET: api/assigneds
        #region Get All Assigneds
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpGet]
        [Route("api/assigneds/Getassigneds")]
        public System.Object Getassigneds()
        {
            var v = (from t in db.assigneds
                     join a in db.mentors on t.mentorid equals a.mentorid
                     join b in db.courses on t.courseid equals b.courseid
                     join c in db.trainees on b.trainee_course equals c.traineeid
                     select new
                     {
                         a.mentorid,
                         course = b.title,
                         mentorname = a.name,
                         traineename = c.name,
                         t.courseid,
                         b.title,
                         t.startday,
                         t.endday,
                         t.address,
                         t.notes,
                         t.time
                     }).ToList();
            return v;
        }

        #endregion
      

        #region Get 1 Assigneds
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpGet]
        [Route("api/assigneds/Getassigned/{courseid}")]

        // GET: api/assigneds/5
        [ResponseType(typeof(assigned))]
        public IHttpActionResult Getassigned(string courseid)
        {
            var v = (from t in db.assigneds
                     join a in db.mentors on t.mentorid equals a.mentorid
                     join b in db.courses on t.courseid equals b.courseid
                     where t.courseid == courseid
                     select new
                     {
                         a.mentorid,
                         t.courseid,
                         b.title,
                         t.startday,
                         t.notes,
                         t.endday,
                         t.address,
                         t.time,
                         coursetime = b.time
                     }).FirstOrDefault();
            //foreach (var item in v)
                if (v==null)
                {
                    return NotFound();
                }

            return Ok(v);
        }

        #endregion

        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpGet]
        [Route("api/courses/SendMailConfirmContact")]
        [ResponseType(typeof(course))]
        // HÀM GỬI MAIL CẬP NHẬT ĐÃ LIÊN LẠC
        public IHttpActionResult SendMailConfirmContact(int idmentor, string idcourse)
        {
            var mentor = db.mentors.Where(e => e.mentorid == idmentor).FirstOrDefault();
            var course = (from t in db.courses
                          join a in db.trainees on t.trainee_course equals a.traineeid
                          where t.trainee_course == a.traineeid && t.courseid == idcourse
                          select new
                          {
                              email_trainee = a.email,
                              course_name = t.title,
                              mentorphone = mentor.phone,
                              mentoremail = mentor.email,
                              mentorname = mentor.name,
                              
                              coursetime = t.time,
                              courseaddress = t.address
                          }).FirstOrDefault();
            SmtpClient client = new SmtpClient();
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.EnableSsl = true;
            client.Host = "smtp.gmail.com";
            client.Port = 587;
            // setup Smtp authentication
            System.Net.NetworkCredential credentials =
                new System.Net.NetworkCredential("aitiphoto01@gmail.com", "Dungkhoa225");
            client.UseDefaultCredentials = false;
            client.Credentials = credentials;
            //can be obtained from your model
            MailMessage msg = new MailMessage();
            msg.From = new MailAddress("aitiphoto02@gmail.com");
            msg.To.Add(new MailAddress(course.email_trainee)); // Truyền người nhận

            msg.Subject = "[aitiphoto01]_[" + course.email_trainee + "]_Info Course " + course.course_name; // Tiêu đề
            msg.IsBodyHtml = true;

            msg.Body = string.Format("<html><head></head><body><b>Message Email</b></body>");// Nội dung mail



            client.Send(msg);

            var v = db.courses.Where(e => e.courseid == idcourse).FirstOrDefault();
            if (v == null)
            {
                return NotFound();
            }
            if (v.status
                == 0)
            {
                v.status = 1;
            }
            db.SaveChanges();

            return Ok();
        }

        [ResponseType(typeof(course))]
        public IHttpActionResult UpdateStatus3(string id)
        {
            var v = db.courses.Where(e => e.courseid == id).FirstOrDefault();
            if (v == null)
            {
                return NotFound();
            }
            if (v.status < 3)
            {
                v.status = 3;
            }
            db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }


        // update status từ 0 -> 1 từ trống thành đã liên lạc
        [ResponseType(typeof(course))]
        public IHttpActionResult UpdateStatusContact(string id)
        {
            var v = db.courses.Where(e => e.courseid == id).FirstOrDefault();
            if (v == null)
            {
                return NotFound();
            }
            if (v.status
                == 0)
            {
                v.status = 1;
            }
            db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        #region Update assigneds
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.AcceptVerbs("GET", "PUT")]
        [System.Web.Http.HttpPut]

        [Route("api/assigneds/Putassigned/{courseid}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult Putassigned(string courseid, assigned assigned)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (courseid != assigned.courseid)
            {
                return BadRequest();
            }

            db.Entry(assigned).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!assignedExists(courseid))
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

        // POST: api/assigneds

        [ResponseType(typeof(assigned))]
        public IHttpActionResult Postassigned(assigned assigned)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.assigneds.Add(assigned); // lưu asigned

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (assignedExists(assigned.courseid))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = assigned.courseid }, assigned);
        }

        // DELETE: api/assigneds/5
        /* #region Delete Assigned
         [System.Web.Http.AllowAnonymous]
         [System.Web.Http.HttpDelete]
         [System.Web.Http.AcceptVerbs("DELETE")]
         [Route("api/assigneds/Deleteassigned/{courseid}")]
         [ResponseType(typeof(assigned))]
         public IHttpActionResult Deleteassigned(string courseid, assigned assigned)
         {
            assigned = db.assigneds.Find(courseid);
             if (assigned == null)
             {
                 return NotFound();
             }

             db.assigneds.Remove(assigned);
             db.SaveChanges();

             return Ok(assigned);
         }
         #endregion
         */
        //[Route("api/assigneds/Deleteassigned/{courseid}/{mentorid}", Name = "Deleteassigned")]
        [AllowAnonymous]
        [System.Web.Http.AcceptVerbs("GET", "DELETE")]
        //[AcceptVerbs("DELETE")]
        [ResponseType(typeof(assigned))]
        public IHttpActionResult Deleteassigned(string courseid, int mentorid)
        {
            //assigned assigned = db.assigneds.Find(courseid, mentorid);
            var assigned = (from t in db.assigneds where t.courseid == courseid && t.mentorid == mentorid select t).FirstOrDefault();
            if (assigned == null)
            {
                return NotFound();
            }

            db.assigneds.Remove(assigned);
            db.SaveChanges();

            return Ok(assigned);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool assignedExists(string courseid)
        {
            return db.assigneds.Count(e => e.courseid == courseid) > 0;
        }
       
    }
}