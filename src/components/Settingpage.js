import React from 'react'
import'./Settingpage.css';
import { BiArrowBack } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiLockAlt } from "react-icons/bi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { MdWallpaper } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";


function Settingpage(props) {
  return (
    <div className="setting-page">
        <div className="header">
            <BiArrowBack onClick={()=>{props.setOpenSetting(false)}}/>
            <p>Settings</p>
        </div>
        <div className="page-content">
            <div className="profile">
                <img src={props.currentUser.photoURL} alt="user.png" />
                <p>{props.currentUser.fullname}</p>
            </div>
            <div className="settings">
                <div className="content">
                    <div className="icon">
                        <IoMdNotificationsOutline/>
                    </div>
                    <div className="setting-name">
                        <span>Notifications</span>
                    </div>
                </div>
                <div className="content">
                    <div className="icon">
                        <BiLockAlt/>
                    </div>
                    <div className="setting-name">
                        <span>Privacy</span>
                    </div>
                </div>
                <div className="content">
                    <div className="icon">
                        <MdOutlineVerifiedUser/>
                    </div>
                    <div className="setting-name">
                        <span>Security</span>
                    </div>
                </div>
                <div className="content">
                    <div className="icon">
                        <CgDarkMode/>
                    </div>
                    <div className="setting-name">
                        <span>Theme</span>
                    </div>
                </div>
                <div className="content">
                    <div className="icon">
                        <MdWallpaper/>
                    </div>
                    <div className="setting-name">
                        <span>Chat wallpaper</span>
                    </div>
                </div>
                <div className="content">
                    <div className="icon">
                        <MdHelpOutline/>
                    </div>
                    <div className="setting-name">
                        <span>Help</span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>   
  )
}

export default Settingpage