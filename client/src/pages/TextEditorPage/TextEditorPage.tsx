import React, { useState } from "react";
import styles from "./index.module.css";
import "./Editor.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";


import { Menu, MenuItem, styled, Select, FormControl } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import {
    Bold as BoldIcon,
    Italic as ItalicIcon,
    Strikethrough,
    Underline as UnderlineIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    List,
    ListOrdered,
    ClipboardList,
    Undo,
    Redo,
    Save,
    Code,
    Link as LinkIcon
} from "lucide-react";

const StyledMenu = styled(Menu)(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        padding: theme.spacing(1),
        minWidth: 200,
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5),
    transition: "background-color 0.2s ease, color 0.2s ease",
    fontSize: '15px',
    color: '#666666',
    letterSpacing: '1px',
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const StyledSelectField = styled(Select)({
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
    },
    "& .MuiOutlinedInput-input": {
        fontSize: "15px",
        color: "#333333c7",
        letterSpacing: "1px",
    },
});

const TextEditorPage = ()=> {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [headingStyle, setHeadingStyle] = useState<string>("Normal");
    const [isLinkMode, setIsLinkMode] = useState<boolean>(false);
    

    const handleOpen = (e: React.MouseEvent<HTMLElement>)=> {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = ()=> {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleHeadingChange = (event: SelectChangeEvent<unknown>)=> {
        const selectedStyle = event.target.value as string;
        setHeadingStyle(selectedStyle);
    };

    const toggleLinkMode = ()=> {
        setIsLinkMode((prev)=>!prev);
        if(isLinkMode) {
            editor?.chain().focus().unsetLink().run();
        } else {
            editor?.chain().focus().setLink({ href: "https://example.com" }).run()
        }
    }

    type ToolbarActions = {
        'Bold': boolean,
        'Italic': boolean,
        'Underline': boolean,
        'Strikethrough': boolean,
        'AlignLeft': boolean,
        'AlignCenter': boolean,
        'AlignRight': boolean,
        'List': boolean,
        'ListOrdered': boolean,
        'Code': boolean,
        'Link': boolean
    };

    const handleEditorToolbarActions = (actions: ToolbarActions)=> {
        const actionHandlers: Record<keyof ToolbarActions, ()=> void> = {
            Bold: ()=> editor?.chain().focus().toggleBold().run(),
            Italic: ()=> editor?.chain().focus().toggleItalic().run(),
            Underline: () => editor?.chain().focus().toggleUnderline().run(),
            Strikethrough: ()=> editor?.chain().focus().toggleStrike().run(),
            AlignLeft: ()=> console.log('AlignLeft action triggered'),
            AlignCenter: ()=> console.log('AlignCenter action triggered'),
            AlignRight: ()=> console.log('AlignRight action triggered'),
            List: ()=> console.log('List action triggered'),
            ListOrdered: ()=> console.log('Ordered List action triggered'),
            Code: ()=> editor?.chain().focus().toggleCode().run(),
            Link: ()=> editor?.chain().focus().toggleLink({ href: "https://example.com" }).run(),
        };

        Object.keys(actions).forEach((key)=> {
            if(actions[key as keyof ToolbarActions]) {
                actionHandlers[key as keyof ToolbarActions]();
            }
        })
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Strike,
            Underline,
            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true
            }),
            Heading.configure({
                levels: [1,2,3,4,5,6]
            }),
            Image,
            BulletList,
            OrderedList
        ],
        content: "<p>Start editing your document....</p>"
    });


    if(!editor) {
        return null;
    }

    return(
        <div className={styles.editorPage}>
            {/* Toolbar */}
            <header className={styles.toolbarContainer}>
                <div className={styles.pasteContainer}>
                    <ClipboardList className={`${styles.pasteIcon}`} />
                    <span>Paste</span>
                </div>
                <div className={styles.toolbar}>
                    <div className={styles.toolbarMainButtons}>
                        <button className={styles.toolbarButton}>File</button>
                        <button className={styles.toolbarButton}>Edit</button>
                        <button className={styles.toolbarButton}>View</button>
                        <button className={styles.toolbarButton}>Insert</button>
                        <button className={styles.toolbarButton}>Format</button>
                        <button className={styles.toolbarButton}>Tools</button>
                        <button className={styles.toolbarButton}>Table</button>
                        <button className={styles.toolbarButton}>Layout</button>
                        <button className={styles.toolbarButton}>Help</button>
                        <select id="font-selector" className={styles.fontSelector}>
                            <option value="Arial" style={{ fontFamily: "Arial" }}>Arial</option>
                            <option value="Georgia" style={{ fontFamily: "Georgia" }}>Georgia</option>
                            <option value="Courier New" style={{ fontFamily: "Courier New" }}>Courier New</option>
                            <option value="Times New Roman" style={{ fontFamily: "Times New Roman" }}>Times New Roman</option>
                        </select>
                        <div className={styles.fontSizes}>
                            <select id="font-size" className={styles.fontSizeSelector}>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="14">14</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.toolbarOptions}>
                        <div className={styles.options}>
                            <button 
                                onClick={() => handleEditorToolbarActions({
                                    Bold: true,
                                    Italic: false,
                                    Underline: false,
                                    Strikethrough: false,
                                    AlignLeft: false,
                                    AlignCenter: false,
                                    AlignRight: false,
                                    List: false,
                                    ListOrdered: false,
                                    Code: false,
                                    Link: false
                                })}
                                disabled={!editor.can().chain().focus().toggleBold().run()}
                                className={`${styles.optionButton} ${editor.isActive('bold') ? styles.activeButton : ''}`}
                            >
                                <BoldIcon className={`${editor.isActive('bold') ? styles.activeButtonIcon : styles.icon}`} />
                            </button>

                            <button 
                                onClick={()=> handleEditorToolbarActions({
                                    Bold: false,
                                    Italic: true,
                                    Underline: false,
                                    Strikethrough: false,
                                    AlignLeft: false,
                                    AlignCenter: false,
                                    AlignRight: false,
                                    List: false,
                                    ListOrdered: false,
                                    Code: false,
                                    Link: false
                                })}
                                disabled={!editor.can().chain().focus().toggleItalic().run()}
                                className={`${styles.optionButton} ${editor.isActive('italic') ? styles.activeButton: ''}`}
                            >
                                <ItalicIcon className={`${editor.isActive('italic') ? styles.activeButtonIcon : styles.icon}`} />
                            </button>

                            <button 
                                onClick={()=> handleEditorToolbarActions({
                                    Bold: false,
                                    Italic: false,
                                    Underline: true,
                                    Strikethrough: false,
                                    AlignLeft: false,
                                    AlignCenter: false,
                                    AlignRight: false,
                                    List: false,
                                    ListOrdered: false,
                                    Code: false,
                                    Link: false
                                })}
                                disabled={!editor.can().chain().focus().toggleUnderline().run()}
                                className={`${styles.optionButton} ${editor.isActive('underline') ? styles.activeButton : ''}`}
                            >
                                <UnderlineIcon className={`${editor.isActive('underline') ? styles.activeButtonIcon: styles.icon}`} />
                            </button>

                            <button 
                                onClick={()=> handleEditorToolbarActions({
                                    Bold: false,
                                    Italic: false,
                                    Underline: false,
                                    Strikethrough: true,
                                    AlignLeft: false,
                                    AlignCenter: false,
                                    AlignRight: false,
                                    List: false,
                                    ListOrdered: false,
                                    Code: false,
                                    Link: false
                                })}
                                disabled={!editor.can().chain().focus().toggleStrike().run()}
                                className={`${styles.optionButton} ${editor.isActive('strike') ? styles.activeButton : ''}`}
                            >
                                <Strikethrough className={`${editor.isActive('strike') ? styles.activeButtonIcon : styles.icon}`} />
                            </button>

                            <button 
                                onClick={toggleLinkMode}
                                className={`${styles.optionButton} ${isLinkMode ? styles.activeButton : ''}`}
                            >
                                <LinkIcon className={`${isLinkMode ? styles.activeButtonIcon : styles.icon}`} />
                            </button>

                            <button 
                                onClick={()=> handleEditorToolbarActions({
                                    Bold: false,
                                    Italic: false,
                                    Underline: false,
                                    Strikethrough: false,
                                    AlignLeft: false,
                                    AlignCenter: false,
                                    AlignRight: false,
                                    List: false,
                                    ListOrdered: false,
                                    Code: true,
                                    Link: false
                                })}
                                disabled={!editor.can().chain().focus().toggleCode().run()}
                                className={`${styles.optionButton} ${editor.isActive('code') ? styles.activeButton : ''}`}
                            >
                                <Code className={`${editor.isActive('code') ? styles.activeButtonIcon : styles.icon}`} />
                            </button>
                            <div>
                                <button
                                    onClick={handleOpen}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                    className={styles.optionButton}
                                >
                                    <AlignLeft className={styles.icon} /> <span>Align Text</span>
                                </button>
                                <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                    <StyledMenuItem onClick={handleClose}>
                                        <AlignLeft className={styles.icon} /> <span>Align Left</span>
                                    </StyledMenuItem>
                                    <StyledMenuItem onClick={handleClose}>
                                        <AlignCenter className={styles.icon} /> <span>Align Center</span>
                                    </StyledMenuItem>
                                    <StyledMenuItem onClick={handleClose}>
                                        <AlignRight className={styles.icon} /> <span>Align Right</span>
                                    </StyledMenuItem>
                                    <StyledMenuItem onClick={handleClose}>
                                        <AlignJustify className={styles.icon} /> <span>Align Justify</span>
                                    </StyledMenuItem>
                                </StyledMenu>
                            </div>
                            <button className={styles.optionButton}>
                                <List className={styles.icon} /> 
                            </button>
                            <button className={styles.optionButton}>
                                <ListOrdered className={styles.icon} /> 
                            </button>
                            <button className={styles.optionButton}>Clear Formatting</button>
                            <FormControl variant="outlined" size="small">
                                {/* <InputLabel id="heading-select-label">Heading</InputLabel> */}
                                <StyledSelectField
                                    labelId="heading-select-label"
                                    value={headingStyle}
                                    onChange={handleHeadingChange}
                                    
                                    sx={{
                                        background: 'white',
                                        outline: 'none'
                                    }}
                                >
                                    <MenuItem value="Normal">Normal</MenuItem>
                                    <MenuItem value="No Spacing">No Spacing</MenuItem>
                                    <MenuItem value="Heading 1">Heading 1</MenuItem>
                                    <MenuItem value="Heading 2">Heading 2</MenuItem>
                                    <MenuItem value="Title">Title</MenuItem>
                                </StyledSelectField>
                            </FormControl>
                            <button className={styles.optionButton}>
                                <Undo className={styles.icon} />
                            </button>
                            <button className={styles.optionButton}>
                                <Redo className={styles.icon} />
                            </button>
                            <button className={styles.optionButton}>
                                <Save className={styles.icon} />
                            </button>
                            <button className={`${styles.optionButton} ${styles.exportButton}`}>Export</button>
                        </div>
                    </div>
                </div>
            </header>
            <div className={styles.editorWrapper}>
                <aside className={styles.sideBar}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nobis dolor nostrum dolorem, perferendis quo ad corporis, atque, ipsum omnis inventore quisquam? Vel quia obcaecati odio ducimus rem qui delectus.
                </aside>
                <main className={styles.editorContainer}>
                    <EditorContent 
                        editor={editor}
                        className={styles.editorTab}
                    />
                </main>
            </div>
        </div>
    )
}

export default TextEditorPage;