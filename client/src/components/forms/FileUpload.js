import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from "axios";
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';

const FileUpload = ({
  values, 
  setValues,
  setLoading,
}) => {
  const { user } = useSelector(state => ({ ...state }))
 
  const fileUploadAndResize = (e) => {
    //resize
    let files = e.target.files;
    let allUploadedfiles = values.images;

    if (files) { 
       setLoading(true);
       for (let i = 0; i < files.length; i++) {
          Resizer.imageFileResizer(
            files[i],
            720,
            720, 
            'JPEG',
            100,
            0,
            (uri) => {
              axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri }, {
                headers: {
                  authtoken: user ? user.token : '',
                }
              }) 
              .then(res => {
                console.log('IMAGE UPLOAD RES DATE');
                setLoading(false);
                allUploadedfiles.push(res.data);

                setValues({ ...values, images: allUploadedfiles });
              })
              .catch(err => {
                console.log(err, 'CLOUDNARY UPLOAD ERROR');
                setLoading(false)
              })
            },
            'base64'
         );
       }
    }
    //send back to the server to upload to cloudaniry
    //set the url to image[] in the parent component state
  }

  const handleImageRemove = (public_id) => {
    console.log(public_id);
    setLoading(true);
    axios.post(`${process.env.REACT_APP_API}/removeimage`, {public_id}, {
      headers: {
        authtoken: user ? user.token : '',
      }
    })
    .then((res) => {
      setLoading(false);
      const { images } = values;
      let filteredImages = images.filter((image) => {
        return image.public_id !== public_id;
      })
      setValues({...values, images: filteredImages });
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    })
  }
  return ( 
    <>
      <div className="row">
        {values.images && values.images.map((image) => {
          return (
            <Badge 
              count='X' 
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: 'pointer'}}
            >
              <Avatar 
                    key={image.public_id} 
                    src={image.url} 
                    size={100}
                    shape='square'
                    className='ml-3 mb-2'
                />
            </Badge>
          )
        })}
      </div>
      <div className='row'>
        <label className='btn btn-primary btn-raised'>Choose File
          <input 
            type='file' 
            multiple 
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
    </div>
    </>
    
   );
}
 
export default FileUpload;