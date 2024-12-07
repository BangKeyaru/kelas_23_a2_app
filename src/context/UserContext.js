import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [namaPengguna, setNamaPengguna] = useState("Evelyn"); // Initial value for the username
    const [emailPengguna, setEmailPengguna] = useState(""); // Initial value for the email
    const [alamatLengkap, setAlamatLengkap] = useState(""); // Initial value for the full address
    const [kecamatan, setKecamatan] = useState(""); // Initial value for the district

    // Functions to update the states
    const updateProfilePicture = (newProfilePicture) => {
        setProfilePicture(newProfilePicture);
    };

    const updateNamaPengguna = (newNamaPengguna) => {
        setNamaPengguna(newNamaPengguna);
    };

    const updateEmailPengguna = (newEmailPengguna) => {
        setEmailPengguna(newEmailPengguna);
    };

    const updateAlamatLengkap = (newAlamatLengkap) => {
        setAlamatLengkap(newAlamatLengkap);
    };

    const updateKecamatan = (newKecamatan) => {
        setKecamatan(newKecamatan);
    };

    return (
        <UserContext.Provider
            value={{
                profilePicture,
                namaPengguna,
                emailPengguna,
                alamatLengkap,
                kecamatan,
                updateProfilePicture,
                updateNamaPengguna,
                updateEmailPengguna,
                updateAlamatLengkap,
                updateKecamatan,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
