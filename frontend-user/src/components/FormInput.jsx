import React from 'react';

const FormInput = (props) => {
    return (
        <div className="mb-3">
            <label className="form-label">{props.label}</label>
            <input 
                type={props.type} 
                className="form-control" 
                placeholder={props.placeholder} 
            />
        </div>
    );
};

export default FormInput;