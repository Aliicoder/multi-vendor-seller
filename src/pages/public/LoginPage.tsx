import LogInForm from "@/components/forms/LogInForm"
const LoginPage = () => {
  return (
    <div className="flex">
      <div
        className="hidden justify-center items-center 
        md:flex md:w-1/2"
      >
        <img src="/svgs/login.svg" className=" w-1/2" alt="" />
      </div>
      <LogInForm />
    </div>
  )
}

export default LoginPage
