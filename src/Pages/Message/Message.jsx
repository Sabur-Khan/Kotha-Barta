import Friends from "../../Components/Friends/Friends"
import MyGroups from "../../Components/MyGroups/MyGroups"
import SaideBar from "../../Components/SideBar/SaideBar"


const Message = () => {
  return (
    <div>
        <div className='max-w-[1440px] lg:mt-0 md:mt-10 mt-10 lg:mb-0 md:mb-10 mb-11 lg:h-full w-full mx-auto py-2 lg:px-[20px] md:px-3 px-3 bg-white shadow-md rounded-xl flex lg:gap-[40px]'>
        
            <div>
            <SaideBar/>
            </div>
        
            <div className='w-full grid lg:grid-rows-2 lg:grid-flow-col md:grid-rows-2 md:lg:grid-flow-col grid-rows-2 lg:gap-5 md:gap-2 gap-2'>

                <div>
                    <MyGroups/>
                </div>
                <div>
                    <Friends/>
                </div>

            
            </div>

        </div>
    </div>
  )
}

export default Message