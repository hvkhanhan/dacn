using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TMS_Api.Models;

namespace TMS_Api.Controllers
{
    public class skillsController : ApiController
    {
        private tmsdbEntities1 db = new tmsdbEntities1();


        // GET: api/skills
        [System.Web.Http.Route("api/skills/Getskills")]
        public IQueryable<skill> Getskills()
        {
            return db.skills;
        }

        // GET: api/skills/5
        [System.Web.Http.Route("api/skills/Getskil/{id}")]
        [ResponseType(typeof(skill))]
        public IHttpActionResult Getskill(int id)
        {
            skill skill = db.skills.Find(id);
            if (skill == null)
            {
                return NotFound();
            }

            return Ok(skill);
        }

        // PUT: api/skills/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putskill(int id, skill skill)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != skill.idskill)
            {
                return BadRequest();
            }

            db.Entry(skill).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!skillExists(id))
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

        // POST: api/skills
        [ResponseType(typeof(skill))]
        public IHttpActionResult Postskill(skill skill)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.skills.Add(skill);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = skill.idskill }, skill);
        }

        // DELETE: api/skills/5
        [ResponseType(typeof(skill))]
        public IHttpActionResult Deleteskill(int id)
        {
            skill skill = db.skills.Find(id);
            if (skill == null)
            {
                return NotFound();
            }

            db.skills.Remove(skill);
            db.SaveChanges();

            return Ok(skill);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool skillExists(int id)
        {
            return db.skills.Count(e => e.idskill == id) > 0;
        }
    }
}