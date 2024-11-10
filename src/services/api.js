import axios from 'axios';
import Swal from 'sweetalert2';

// Function to send the PDF file to the server
export const sendPDF = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log('File uploaded successfully:', response.data);
        Swal.fire({
            title: "Good job!",
            text: "PDF uploaded successfully!",
            icon: "success"
        });
    } catch (error) {
        if (error.response && error.response.status === 400) {
            Swal.fire({
                title: "File Already Exists",
                text: "The file you are trying to upload already exists.",
                icon: "warning"
            });
        } else {
            Swal.fire({
                title: "Upload Error",
                text: "There was an error uploading the file.",
                icon: "error"
            });
            console.error('Error uploading file:', error);
        }
    }
};

// Function to send a message
export const sendQuery = async (message) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/query/?query=${message}`);
        console.log(response.data);
               
        return response.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

// Function to delete all the documents
export const deleteDocuments = async () => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/clear-document-store");
        Swal.fire({
            title: "Deleted!",
            text: "Your files have been deleted.",
            icon: "success"
        });
        return response.data;
    } catch (error) {
        console.error('There was a problem with the delete operation:', error);
        Swal.fire({
            title: "Delete Error",
            text: "There was an error deleting the files.",
            icon: "error"
        });
        return null;
    }
};

// Function to get the list of documents
export const getDocuments = async () => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/get-all-documents");
        return response.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        Swal.fire({
            title: "Fetch Error",
            text: "There was an error fetching documents.",
            icon: "error"
        });
        return { documents: [] }; // Return an empty list on error
    }
};
