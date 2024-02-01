import React, { useContext } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { Title } from "../../Components/Title/Title";
import { UserForm } from "../../Components/UserForm/UserForm";
import { MoviesContext } from "../../context/MoviesContext";

function NewUser()
{
    const { saveNewUser } = useContext(MoviesContext);
    return(
        <Layout>
            <Title text={'New user'} />

            <div>
                <UserForm 
                    submitFunction = {saveNewUser}
                    isNewUser= {true}
                />
            </div>
        </Layout>
    )
}

export { NewUser }