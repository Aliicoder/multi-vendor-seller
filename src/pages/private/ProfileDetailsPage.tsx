import SellerGeneralInfoForm from "@/components/forms/SellerGeneralInfo"
import SellerBusinessInfoForm from "@/components/forms/SellerBusinessInfoForm"
import SellerAccountInfo from "@/components/forms/SellerAccountInfo"
import { useFetchProfileQuery } from "@/store/apiSlices/authSlice";
function ProfileDetailsPage() {
  const {data:response ,isLoading} = useFetchProfileQuery({})
  return (
    <div className='flex flex-col gap-4  p-[2%] '>
      <SellerGeneralInfoForm 
        name={response?.profile?.seller?.name} 
        image={response?.profile?.seller?.avatar}/>
      <SellerBusinessInfoForm 
        name={response?.profile?.businessInformation?.name} 
        state={response?.profile?.businessInformation?.state} 
        district={response?.profile?.businessInformation?.district}
        subDistrict={response?.profile?.business?.subDistrict}/>
      <SellerAccountInfo 
        email={response?.profile?.seller?.email}
        status={response?.profile?.seller?.status}
        payment={response?.profile?.seller?.payment}
        role={"seller"}/>
  </div>
  )
}

export default ProfileDetailsPage