import React, { useState } from 'react';
import { DropzoneDialogBase, FileObject } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography, makeStyles, IconButton } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  fileName: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },
}));

interface ImageDropzoneProps {
  name: string;
  setFieldValue(name: string, value: any): void;
  buttonText: string;
  formikImages: Array<FileObject> | [];
}

export default function ImageDropzone({
  name,
  setFieldValue,
  buttonText,
  formikImages,
}: ImageDropzoneProps) {
  const [open, setOpen] = useState(false);
  const [fileObjects, setFileObjects] = useState(formikImages);

  const classes = useStyles();

  const onFileDelete = (deleteFileObj: FileObject) => {
    const filteredFileObjects = fileObjects.filter(
      (fileObj) => fileObj.data !== deleteFileObj.data
    );
    setFileObjects(filteredFileObjects);
    setFieldValue(name, filteredFileObjects);
  };

  return (
    <div className="mb-3 mt-5">
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        {buttonText}
      </Button>

      <DropzoneDialogBase
        acceptedFiles={['image/*']}
        fileObjects={fileObjects}
        cancelButtonText={'cancel'}
        submitButtonText={'submit'}
        maxFileSize={5000000}
        open={open}
        onAdd={(newFileObjs) => {
          console.log('onAdd', newFileObjs);
          setFileObjects([...fileObjects, ...newFileObjs]);
        }}
        onDelete={(deleteFileObj) => {
          console.log('onDelete', deleteFileObj);
          console.log('fileObjects', fileObjects);
          onFileDelete(deleteFileObj);
        }}
        onClose={() => setOpen(false)}
        onSave={(e) => {
          setFieldValue(name, fileObjects);
          setOpen(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />

      {fileObjects.map((fileObj, index) => (
        <div key={index} className={classes.fileName}>
          <Typography>{fileObj.file.name}</Typography>
          <IconButton onClick={() => onFileDelete(fileObj)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
}
