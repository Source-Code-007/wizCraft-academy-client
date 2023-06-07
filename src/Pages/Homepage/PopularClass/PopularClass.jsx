import UseRole from "../../../Hook/UseRole";

const PopularClass = () => {
    const [isRole, isRoleLoading] = UseRole()
    console.log(isRole, isRoleLoading);
    return (
        <div className='py-20 my-container'>
            This is popular class
        </div>
    );
};

export default PopularClass;