import React,{useState,createRef} from 'react';
import classNames from 'classnames';
import './index.css';
import Umbrella from './umbrella';
import ColorButtons from './colorButtons';
import UploadIcon from '../assets/UploadIcon.svg';
import Loader from '../assets/Loader.svg'

const CustomizeUmbrella = () => {
  const [color, setColor] = useState('blue');
  const [fileLoading, setFileLoading] = useState(false);
  const [uploadButtonLoading, setUploadButtonLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const InputRef = createRef();

  const UmbrellaClass = classNames({
    ['Row']: true,
    [`Row--${color}`]: color,
  });

  const UploadIconClass = classNames({
    ['Upload-icon']: true,
    ['Upload-icon-loading']: fileLoading || uploadButtonLoading
  })

  const UploadButtonClass = classNames({
    ['Upload-Button']: true,
    [`Upload-Button--${color}`]: color
  });

  const CloseIconClass = classNames({
    ['material-icons']: true,
    ['Close-icon']: true,
    ['Close-icon--visible']: fileName !== '',
  });

  const onChangeColor = (e, umbrellaColor) => {
    setColor(umbrellaColor);
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    e.target.value = null;

    setFileLoading(true);
    setTimeout(() => {
      setFileName(file.name);
      setFileLoading(false);
      setFile(URL.createObjectURL(file));
    }, 1000);
  };

  const onToggleUploadIcon = () => {
    setUploadButtonLoading(!uploadButtonLoading);
  }

  const onRemoveLogo = () => {
    setFile(null);
    setFileName('');
  }

  const onUploadLogo = () => {
    if (uploadButtonLoading || fileLoading) return;
    InputRef && InputRef.current.click();
  }

  return (
    <div className={UmbrellaClass}>
      <div className='Col Col--6 Col--s-12 Col--xs-12' >
        <Umbrella logo={file} color={color} toggleUploadIcon={onToggleUploadIcon}/>
      </div>
      <div className='Col Col--6 Col--s-12 Col--xs-12'>
        <div className='Info-wrapper'>
          <h1 className='Heading'>Custom Umbrella</h1>
          <ColorButtons color={color} onChangeColor={onChangeColor} />
          <p className='Text Text--strong'>Customize your umbrella</p>
          <p className='Text Text--subtle'>Upload a logo for an instant preview</p>
          <p className='Text Text--small Text--subtle'>.png and .jpg file only. Max file size is 5MB.</p>
          <div className='Upload'>
            <input
              type="file"
              ref={InputRef}
              onChange={onChangeFile}
              accept="image/x-png,image/gif,image/jpeg,image/jpg"
              style={{ display: 'none' }}
            />
            <div className={UploadButtonClass}>
              <img
                src={fileLoading || uploadButtonLoading ? Loader : UploadIcon}
                onClick={onUploadLogo}
                className={UploadIconClass}
                alt="Upload Logo"
                 />
              <p className='Text--strong Text--ellipsis'>{fileName ? fileName : 'UPLOAD LOGO'}</p>
              <div className='Upload-close'>
                <i className={CloseIconClass} onClick={onRemoveLogo}>close</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeUmbrella;
