using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;

namespace Dropdownlistbinding
{
    /// <summary>
    /// Summary description for DataService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class DataService : System.Web.Services.WebService
    {

        [WebMethod]
        public void GetCountries()
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            List<Countries> country = new List<Countries>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("spGetCountries", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Countries Countries = new Countries();
                    Countries.Id = Convert.ToInt32(rdr["Id"]);
                    Countries.Name = rdr["Name"].ToString();
                    country.Add(Countries);
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(country));

        }

        [WebMethod]
        public void GetStatesByCountriesId(int CountriesId)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            List<States> State = new List<States>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("spGetStatesByCountriesId", con);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter param = new SqlParameter()
                {
                    ParameterName = "@CountriesId",
                    Value = CountriesId
                };
                cmd.Parameters.Add(param);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    States States = new States();
                    States.Id = Convert.ToInt32(rdr["Id"]);
                    States.Name = rdr["Name"].ToString();
                    States.CountriesId = Convert.ToInt32(rdr["CountriesId"]);
                    State.Add(States);
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(State));
        }
        [WebMethod]
        public void GetDistrictsByStatesId(int StatesId)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            List<Districts> District = new List<Districts>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("spGetDistrictsByStatesId", con);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter param = new SqlParameter()
                {
                    ParameterName = "@StatesId",
                    Value = StatesId
                };
                cmd.Parameters.Add(param);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Districts Districts = new Districts();
                    Districts.Id = Convert.ToInt32(rdr["Id"]);
                    Districts.Name = rdr["Name"].ToString();
                    Districts.StatesId = Convert.ToInt32(rdr["StatesId"]);
                    District.Add(Districts);
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(District));
        }
        [WebMethod]
        public void AddEmployee(Countries data)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("ContryInsert", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Name",
                    Value = data.Name
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Id",
                    Value = data.Id
                });

                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
        [WebMethod]
        public void GetRegister()
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            List<Register> Registers = new List<Register>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("select* from Register_Table", con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Register Register = new Register();
                    Register.Id = Convert.ToInt32(rdr["Id"]);
                    Register.Name = rdr["Name"].ToString();
                    Register.Email = rdr["Email"].ToString();
                    Register.Pnum = Convert.ToInt64(rdr["Pnum"]);
                    Register.Country = rdr["Country"].ToString();
                    Register.State = rdr["State"].ToString();
                    Register.District = rdr["District"].ToString();
                    Register.Gender = rdr["Gender"].ToString();
                    Register.Status = rdr["Status"].ToString();
                    Registers.Add(Register);
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(Registers));
        }
        [WebMethod]
        public void InsertRegister(Register data)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("InsertupdateRegister", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Id",
                    Value = data.Id
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Name",
                    Value = data.Name
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Email",
                    Value = data.Email
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Pnum",
                    Value = data.Pnum
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Country",
                    Value = data.Country
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@State",
                    Value = data.State
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@District",
                    Value = data.District
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Gender",
                    Value = data.Gender
                });

                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
        [WebMethod]
        public void DeleteRegisterId(Register data)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                
                SqlCommand cmd = new SqlCommand("spRegisterDeleteByID", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", Convert.ToInt32(data.Id));
                con.Open();
                cmd.ExecuteNonQuery();

            }
        }
        [WebMethod]
        public int Delete(int ID)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("spRegisterDeleteByID", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", ID);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        [WebMethod]
        public void On_Click_EditRegister(int Id)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            List<Register> Registers = new List<Register>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("Edit_GetRegister", con);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter param = new SqlParameter()
                {
                    ParameterName = "@Id",
                    Value = Id
                };
                cmd.Parameters.Add(param);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Register Register = new Register();
                    Register.Id = Convert.ToInt32(rdr["Id"]);
                    Register.Name = rdr["Name"].ToString();
                    Register.Email = rdr["Email"].ToString();
                    Register.Pnum = Convert.ToInt64(rdr["Pnum"]);
                    Register.Country = rdr["Country"].ToString();
                    Register.State = rdr["State"].ToString();
                    Register.District = rdr["District"].ToString();
                    Register.Gender = rdr["Gender"].ToString();
                    Register.Status = rdr["Status"].ToString();
                    Registers.Add(Register);
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(Registers));
        }
        [WebMethod]
        public void Status_Register(int ID,string status)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("spStatusChange_Register", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", ID);
                cmd.Parameters.AddWithValue("@Status", status);
                cmd.ExecuteNonQuery();
            }
        }
        [WebMethod]
        public void Get_Status(int Id)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            List<Register> Registers = new List<Register>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("Status_Get", con);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter param = new SqlParameter()
                {
                    ParameterName = "@Id",
                    Value = Id
                };
                cmd.Parameters.Add(param);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Register Register = new Register();
                    Register.Status = rdr["Status"].ToString();
                    Registers.Add(Register);

                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(Registers));
        }
        [WebMethod]
        public void Search_Btn(String Name,String Email,String Status)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            List<Register> Registers = new List<Register>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_SearchRecord", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Name", Name);
                cmd.Parameters.AddWithValue("@Email", Email);
                cmd.Parameters.AddWithValue("@Status", Status);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Register Register = new Register();
                    Register.Id = Convert.ToInt32(rdr["Id"]);
                    Register.Name = rdr["Name"].ToString();
                    Register.Email = rdr["Email"].ToString();
                    Register.Pnum = Convert.ToInt64(rdr["Pnum"]);
                    Register.Country = rdr["Country"].ToString();
                    Register.State = rdr["State"].ToString();
                    Register.District = rdr["District"].ToString();
                    Register.Gender = rdr["Gender"].ToString();
                    Register.Status = rdr["Status"].ToString();
                    Registers.Add(Register);
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(Registers));
        }

        //[WebMethod]
        //public void UpdateRegister(Register data)
        //{
        //    string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        //    using (SqlConnection con = new SqlConnection(cs))
        //    {
        //        SqlCommand cmd = new SqlCommand("spUpdateRegister", con);
        //        cmd.CommandType = CommandType.StoredProcedure;

        //        cmd.Parameters.Add(new SqlParameter()
        //        {
        //            ParameterName = "@Id",
        //            Value = data.Id
        //        });

        //        cmd.Parameters.Add(new SqlParameter()
        //        {
        //            ParameterName = "@Name",
        //            Value = data.Name
        //        });
        //        cmd.Parameters.Add(new SqlParameter()
        //        {
        //            ParameterName = "@Email",
        //            Value = data.Email
        //        });
        //        cmd.Parameters.Add(new SqlParameter()
        //        {
        //            ParameterName = "@Pnum",
        //            Value = data.Pnum
        //        });
        //        cmd.Parameters.Add(new SqlParameter()
        //        {
        //            ParameterName = "@Country",
        //            Value = data.Country
        //        });
        //        cmd.Parameters.Add(new SqlParameter()
        //        {
        //            ParameterName = "@State",
        //            Value = data.State
        //        });
        //        cmd.Parameters.Add(new SqlParameter()
        //        {
        //            ParameterName = "@District",
        //            Value = data.District
        //        });
        //        cmd.Parameters.Add(new SqlParameter()
        //        {
        //            ParameterName = "@Gender",
        //            Value = data.Gender
        //        });

        //        con.Open();
        //        cmd.ExecuteNonQuery();
        //    }
        //}


    }
}
