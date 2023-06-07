/* eslint-disable no-unused-vars */
import UseRole from "../../../Hook/UseRole";

const PopularClass = () => {
    const [isRole, isRoleLoading] = UseRole()
    return (
        <div className='py-20 my-container'>
            This is popular class
        </div>
    );
};

export default PopularClass;