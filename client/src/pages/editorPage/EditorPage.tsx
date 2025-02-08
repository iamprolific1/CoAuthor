import { useState } from 'react';
import styles from './index.module.css';
import { 
    FileText,
    Star,
    FolderOpen,
    History,
    MessageSquareMore,
    Video,
    LockKeyhole,
    Bold,
    Italic,
    Underline,
    Undo,
    Redo,
    Strikethrough,
    Link,
    Code,
    Printer,
    Plus,
    Minus,
    AlignLeft,
    AlignRight,
    AlignCenter,
    AlignJustify,
    Image,
    List,
    ListOrdered,
    Subscript,
    Superscript
} from "lucide-react";
import { CompactPicker } from "react-color";
import UserAvatar from "../../assets/profile-1.jpg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormatLineSpacingIcon from "@mui/icons-material/FormatLineSpacing";

const EditorPage = ()=> {

    const [fontColor, setFontColor] = useState<string>("#000000");
    const [showFontColorPicker, setShowFontColorPicker] = useState<boolean>(false);
    const [backgroundColor, setBackgroundColor] = useState<string>("#FFFFFF");
    const [showBackgroundColorPicker, setShowBackgroundColorPicker] = useState<boolean>(false);
    
    const applyFontColor = (color: { hex: string })=> {
        setFontColor(color.hex);
    };

    const toggleShowFontColorPicker = ()=> {
        setShowFontColorPicker((prev)=> !prev);
    };

    const applyBackgroundColor = (color: { hex: string })=> {
        setBackgroundColor(color.hex);
    };

    const toggleShowBackgroundColor = ()=> {
        setShowBackgroundColorPicker((prev)=> !prev);
    }

    return (
        <div className={styles.editorPage}>
            {/* Header */}

            <header className={styles.editorHeader}>
                <div className={styles.topHeaderNav}>
                    <div className={styles.headerIcon}>
                        <FileText className={styles.icon} />
                    </div>
                    <div className={styles.primaryToolbar}>
                        <div className={styles.primaryTools}>
                            <div className={styles.top}>
                                <div className={styles.documentNameContainer}>
                                    <input type="text" className={styles.documentName} value="Untitled Document" />
                                </div>
                                <div>
                                    <Star className={styles.icon} />
                                </div>
                                <div>
                                    <FolderOpen className={styles.icon} />
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <button>File</button>
                                <button>Edit</button>
                                <button>View</button>
                                <button>Insert</button>
                                <button>Format</button>
                                <button>Tools</button>
                                <button>Help</button>
                            </div>
                        </div>
                        <div className={styles.utilityTools}>
                            <button className={styles.iconContainer}>
                                <History className={styles.icon} />
                            </button>
                            <button className={styles.iconContainer}>
                                <MessageSquareMore className={styles.icon} />
                            </button>
                            <button className={styles.iconContainer}>
                                <Video className={styles.icon} />
                            </button>
                            <button className={styles.shareButton}>
                                <LockKeyhole className={styles.icon} /> Share
                            </button>
                            <div className={styles.profile}>
                                <img src={UserAvatar} alt="profile-image" />
                                <span className={styles.userActive}></span>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.bottomHeaderNav}>
                    <div>
                        <button className={styles.iconButton}>
                            <Undo className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <Redo className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <Printer className={styles.icon} />
                        </button>
                    </div>

                    <div className={styles.fontStyling}>
                        <select id="zoom-size" className={styles.zoomSize_selector}>
                            <option value="100">100%</option>
                            <option value="75">75%</option>
                            <option value="50">50%</option>
                            <option value="25">25%</option>
                        </select>
                        <select id="zoom-size" className={styles.heading_selector}>
                            <option value="Normal">Normal</option>
                            <option value="No Spacing">No Spacing</option>
                            <option value="Heading 1">Heading 1</option>
                            <option value="Heading 2">Heading 2</option>
                            <option value="Title">Title</option>
                        </select>
                        <select id="zoom-size" className={styles.font_selector}>
                            <option value="Arial">Arial</option>
                            <option value="Calibri">Calibri</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Times New Roman">Times New Roman</option>
                        </select>
                        <div className={styles.increaseFontSize}>
                            <button>
                                <Plus className={styles.icon} />
                            </button>
                            <input type="text" className={styles.fontSize} value={"74"} />
                            <button>
                                <Minus className={styles.icon} />
                            </button>
                        </div>
                    </div>

                    <div>
                        <button className={styles.iconButton}>
                            <Bold className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <Italic className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <Underline className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <Strikethrough className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <Link className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <Code className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <Image className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <AlignLeft className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <AlignCenter className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <AlignRight className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <AlignJustify className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <List className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <ListOrdered className={styles.icon} />
                        </button>
                        <button className={styles.iconButton}>
                            <FormatLineSpacingIcon className={styles.icon} />
                        </button>
                        <div 
                        style={{ 
                            display: 'flex', 
                            alignItems:'center', 
                            gap: '5px'
                        }}>
                            <button className={styles.iconButton}>
                                <Subscript className={styles.icon} />
                            </button>
                            <button className={styles.iconButton}>
                                <Superscript className={styles.icon} />
                            </button>
                        </div>
                        <div className={styles.colorWrapper}>
                            <button className={`${styles.colorPickerButton}`} onClick={toggleShowFontColorPicker}>
                                <span style={{ color: fontColor}}>A</span>
                                <ArrowDropDownIcon sx={{ fontSize: 20 }} />
                            </button>
                            {
                                showFontColorPicker && 
                                <div className={styles.colorPicker}>
                                    <button className={styles.iconButton}>
                                        <CompactPicker color={fontColor} onChange={applyFontColor} />
                                    </button>
                                </div>
                            }
                        </div>
                        <div className={styles.colorBackground}>
                            <button style={{ background: backgroundColor}} className={styles.colorBackgroundButton} onClick={toggleShowBackgroundColor}>
                                <span>A</span>
                                <ArrowDropDownIcon sx={{ fontSize: 20 }} />
                            </button>
                            {
                                showBackgroundColorPicker &&
                                <div className={styles.backgroundColorPicker}>
                                    <button className={styles.iconButton}>
                                        <CompactPicker color={backgroundColor} onChange={applyBackgroundColor} />
                                    </button>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </header>
            {/* Sidebar */}
            <div className={styles.main}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quod nobis esse, obcaecati temporibus cumque ipsam quibusdam tempora neque odio ut veritatis. Repellendus voluptate temporibus culpa beatae ut iure cum voluptates. Veniam eaque, velit dolores dolore ullam suscipit impedit maiores placeat ducimus nesciunt consequuntur hic vero totam. Veritatis, earum odit?
            </div>

            {/* Main content */}
            

        </div>
    )
}

export default EditorPage;