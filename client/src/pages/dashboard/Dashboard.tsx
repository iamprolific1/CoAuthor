import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton, Badge } from "@mui/material";
import Profile1 from "../../assets/profile-1.jpg";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import WindowIcon from "@mui/icons-material/Window";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ActivityChart from "../../components/ActivityChart/ActivityChart";
import MenuIcon from "@mui/icons-material/Menu";

const Dashboard: React.FC = ()=> {

    const [viewMode, setViewMode] = useState<string>('list');
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isNavLinkClose, setIsNavLinkClose] = useState<boolean>(true);

    const handleDragEnter = () => setIsDragging(true);
    const handleDragLeave = ()=> setIsDragging(false);

    const handleCloseNavLink = ()=> {
        setIsNavLinkClose((prev)=> !prev)
    }

    return(
        <div className={styles.dashboard}>
            {/* sidebar */}
            <aside className={styles.sidebar}>
                <button className={styles.menuIcon} onClick={handleCloseNavLink}><MenuIcon /> Menu</button>
                <div className={styles.logo}>CoAuthor</div>
                {
                    (
                        <nav className={`${styles.navLinks} ${isNavLinkClose ? styles.close : ''}`}>
                            <Link to="/dashboard" className={styles.active}><DashboardIcon /> Dashboard</Link>
                            <Link to="#documents"><ArticleIcon /> My Documents</Link>
                            <Link to="#subscriptions"><SubscriptionsIcon /> Subcriptions</Link>
                            <Link to="#settings"><SettingsIcon /> Settings</Link>
                            <Link to="#help"><HelpIcon /> Help & Support</Link>
                        </nav>
                    )
                }
                <button className={`${styles.quickAction} ${isNavLinkClose ? styles.close : ''}`}>+ New Document</button>
            </aside>
            {/* main content */}
            <main className={styles.mainContent}>
                {/* Top Bar */}
                <div className={styles.topBar}>
                    <input type="text" placeholder="Search documents..." className={styles.searchBar} />
                    <div className={styles.profileSection}>
                        <div className={styles.notificationDropdown}>
                            <IconButton>
                                <Badge badgeContent={1} color="error">
                                    <NotificationsIcon className={styles.notificationIcon} />
                                </Badge>
                            </IconButton>
                            {/* <div className={styles.dropdownContent}>
                                <p>📄 Document "Report Q4" was shared with you.</p>
                                <p>🖋️ Jane Doe edited "Meeting Notes".</p>
                                <p>⚠️ Your subscription expires in 2 days.</p>
                            </div> */}
                        </div>
                        <div className={styles.userProfile}>
                            <img src={Profile1} alt="User Profile" />
                            <span>John Doe</span>
                        </div>
                    </div>
                </div>

                {/* Overview Cards */}
                <section className={styles.overviewCards}>
                    <div className={styles.card}>
                        <h3>120</h3>
                        <p>Total Documents</p>
                    </div>

                    <div className={styles.card}>
                        <h3>45</h3>
                        <p>Shared Documents</p>
                    </div>

                    <div className={styles.card}>
                        <h3>3</h3>
                        <p>Active Subscriptions</p>
                    </div>

                    <div className={styles.card}>
                        <h3>75%</h3>
                        <p>Storage Used</p>
                    </div>
                </section>

                {/* Documents List */}
                <section className={styles.documents}>
                    <div className={styles.listHeader}>
                        <h2>Your Documents</h2>
                        <div className={styles.viewToggle}>
                            <button className={styles.listBtn} onClick={()=> setViewMode('list')}> <FormatListBulletedIcon /> </button>
                            <button className={styles.gridBtn} onClick={()=> setViewMode('grid')}> <WindowIcon /> </button>
                        </div>
                    </div>
                    <div className={`${styles.documentLists} ${viewMode === 'grid' ? styles.gridView : styles.listView}`}>

                        {[...Array(5)].map((_, index)=> (

                            <div className={styles.documentItem} key={index}>
                                <div>
                                    <h4>Document Title</h4>
                                    <p>Last updated: Jan 15, 2025</p>
                                </div>
                                <button className={styles.viewDocument}>view document</button>
                            </div>
                        ))}
                    </div>
                    <div className={styles.viewAll}>
                        <Link to="#">View All Documents</Link>
                    </div>

                </section>

                {/* Upload Section */}
                <section className={styles.uploadSection}>
                    <h3>Upload Documents</h3>
                    <div 
                        className={`${styles.dropZone} ${isDragging ? styles.dragOver : ''}`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDragLeave}
                    >
                        <UploadFileIcon style={{ fontSize: '4rem', color: '#2575FC'}} />
                        <p>Drag and drop your files here or click to upload</p>
                        <input type="file" multiple hidden />
                    </div>
                </section>

                {/* Analytics Section */}
                <div>
                    <ActivityChart />
                </div>

                {/* Collaboration Section */}
                <section className={styles.documentCollaboration}>
                    <h3>Your Collaborations</h3>
                    <div className={styles.documentItem}>
                        <h4>Document Title</h4>
                        <p>Last updated: Jan 15, 2025</p>
                        <div className={styles.collaborators}>
                            <span className={styles.avatar}>A</span>
                            <span className={styles.avatar}>B</span>
                            <span className={styles.avatar}>+2</span>
                            <span className={styles.status}>Editing Now</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Dashboard;