import { useNavigate } from 'react-router-dom'
import CustomButton from '../buttons/CustomButton'
import { IoIosArrowBack } from 'react-icons/io'
interface INavigateBack {
  className: string
  text : string
}
function NavigateBack({text,className}:INavigateBack) {
  const navigate = useNavigate()
  return (
    <CustomButton onClick={()=>navigate(-1)}
      className={className}
      direction="left" text={text}  >
      <IoIosArrowBack />
    </CustomButton>
  )
}

export default NavigateBack