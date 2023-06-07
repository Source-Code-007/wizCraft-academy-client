import signupLottie from '../../../public/lottieAnimation/signup-lottie.json'
import UseAuth from "../../Hook/UseAuth";
import Lottie from "lottie-react";

const Signup = () => {
    const { createUserWithEmailPassFunc } = UseAuth()
    console.log(createUserWithEmailPassFunc);

    return (
        <div className="bg-blue-200">
            <div className='grid grid-cols-2 gap-5'>
                <form action="">

                </form>

                <Lottie animationData={signupLottie} loop={true} className='max-h-screen w-full' />
            </div>
        </div>
    );
};

export default Signup;