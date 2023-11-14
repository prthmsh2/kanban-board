import React, { useState } from 'react'
import { Plus, X } from 'react-feather'
import './Editable.css'

function Editable(props) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className='editable'>
      {
        showEdit ?
          (
            <>
              <div className="editable_overlay" onClick={() => setShowEdit(false)}></div>
              <form className='editable_edit' onSubmit={(event) => {
                event.preventDefault();
                if (props.onSubmit) props.onSubmit();
                setShowEdit(false); 
              }}>
                <input type='text' placeholder={props.placeholder} />
                <div className='editable_edit_footer'>
                  <button type='submit' className='editable_edit_footer_add'>{props.buttonText || 'Add' }</button>
                  <X onClick={() => setShowEdit(false)} />
                </div>
              </form>
            </>
          )
          : <Plus onClick={() => setShowEdit(true)} />
      }
    </div>
  );
}

export default Editable;
