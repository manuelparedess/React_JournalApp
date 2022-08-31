

export const fileUpload = async( file ) => {

    if(!file) throw new Error("We don't have any file to upload");

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dfo636dhg/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( !resp.ok ) throw new Error('The image could not be uploaded');

        const cloudResp = await resp.json();

        return cloudResp.secure_url;
        
    } catch (error) {
        throw new Error( error.message )
    }

} 