import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./index.module.css";
import "./Editor.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";

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
import FontStyle from "../../utils/FontStyleExtension";


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

interface Font {
    family: string;
}

const PAGE_HEIGHT = 1123;

const TextEditorPage = ()=> {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [headingStyle, setHeadingStyle] = useState<string>("Normal");
    const [isLinkMode, setIsLinkMode] = useState<boolean>(false);
    const [fonts, setFonts] = useState<Font[]>([]);
    const [selectedFont, setSelectedFont] = useState<string>("Arial");
    const [fontSize, setFontSize] = useState<number[]>([]);
    const [selectedFontSize, setSelectedFontSize] = useState<string>("16");

    const editorRef = useRef<HTMLDivElement | null>(null);
    const [pages, setPages] = useState<string[]>([""]);

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

        switch (selectedStyle) {
            case "Normal": {
                const level = editor?.getAttributes("heading").level;
                if (level && level > 0) {
                editor?.chain().focus().toggleHeading({ level: level }).run();
                }
                break;
            }
            case "No Spacing":
                editor?.chain().focus().setParagraph().run();
                break;
            case "Heading 1":
                editor?.chain().focus().toggleHeading({ level: 1 }).run();
                break;
            case "Heading 2":
                editor?.chain().focus().toggleHeading({ level: 2 }).run();
                break;
            case "Title":
                editor?.chain().focus().toggleHeading({ level: 1 }).setFontSize("28px").run();
                break;
            default:
                break;
        }
    };

    const toggleLinkMode = ()=> {
        setIsLinkMode((prev)=>!prev);
        if(isLinkMode) {
            editor?.chain().focus().unsetLink().run();
        } else {
            editor?.chain().focus().setLink({ href: "https://example.com" }).run()
        }
    };



    useEffect(()=> {
        const fetchFonts = async()=> {
            try{
                const response = await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${import.meta.env.VITE_GOOGLE_FONTS_API_KEY}`);
                setFonts(response.data.items);
            } catch(error) {
                console.error("Error fetching fonts: ", error);
            }
        };
        fetchFonts();
    }, []);

    useEffect(()=> {
        if(selectedFont) {
            const link = document.createElement("link");
            link.href = `https://fonts.googleapis.com/css2?family=${selectedFont.replace(
                " ", "+"
            )}:wght@400;700&display=swap`;
            link.rel = "stylesheet";
            document.head.appendChild(link);
        }
    }, [selectedFont]);

    useEffect(()=> {
        const sizes = []
        for (let i=8; i<48; i+=2) {
            sizes.push(i);
        }
        setFontSize(sizes);
    }, []);

    type ToolbarActions = {
        'Bold': boolean,
        'Italic': boolean,
        'Underline': boolean,
        'Strikethrough': boolean,
        'AlignLeft': boolean,
        'AlignCenter': boolean,
        'AlignRight': boolean,
        'AlignJustify': boolean,
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
            AlignLeft: ()=> editor?.chain().focus().setTextAlign("left").run(),
            AlignCenter: ()=> editor?.chain().focus().setTextAlign("center").run(),
            AlignRight: ()=> editor?.chain().focus().setTextAlign("right").run(),
            AlignJustify: ()=> editor?.chain().focus().setTextAlign("justify").run(),
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
            TextStyle.configure({ HTMLAttributes: { style: "" } }),
            FontStyle,
            Highlight,
            Typography,
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
            OrderedList,
            TextAlign.configure({
                types: ["heading", "paragraph"]
            })
        ],
        content: pages[0],
        onUpdate: ({ editor })=> {
            handlePagination(editor.getHTML())
        }
    });

    // observe editor for exceeded content
    useEffect(()=> {
        const observedEditorHeight = ()=> {
            if(!editorRef.current) return;

            const observer = new ResizeObserver(()=> {
                handlePagination(editor?.getHTML() || "");
            });
            observer.observe(editorRef.current);
            return ()=> observer.disconnect(); // cleanup method
        };
        observedEditorHeight();
    }, [editor]);

    const handlePagination = (content: string)=> {
        if (!editorRef.current) return;
        const editorHeight = editorRef.current.scrollHeight;

        if (editorHeight > PAGE_HEIGHT) {
            splitContentIntoPages(content);
        }
    };

    // function to split editor content into pages.
    const splitContentIntoPages = (content: string) => {
        const words = content.split(" ");
        let tempContent = "";
        let tempHeight = 0;
        const newPages: string[] = [];

        for(let i=0; i < words.length; i++) {
            tempContent += words[i] + " ";
            tempHeight += 20;  // Approximate editor line height

            if(tempHeight >= PAGE_HEIGHT) {
                newPages.push(tempContent);
                tempContent = "";
                tempHeight = 0;
            }
        }

        if(tempContent) newPages.push(tempContent);
        setPages(newPages)
    }

    const handleFontSizeChange = (size: string)=> {
        if (!editor) return;
        editor.chain().focus().setFontSize(size).run();
    }

    const handleFontFamilyChange = (font: string)=> {
        if (!editor) return;
        editor.chain().focus().setFontFamily(font).run();
    };

    useEffect(()=> {
        if (!editor) return;
        editor.chain().focus().setFontFamily(selectedFont).setFontSize(selectedFontSize).run();
    },[editor]);

    useEffect(() => {
        if (!editor) return;

        if (!editor.isActive("fontStyle", { fontFamily: selectedFont })) {
            editor.chain().setFontFamily(selectedFont).run();
        }
    }, [editor, selectedFont]);

    useEffect(() => {
        if (!editor) return;

        if (!editor.isActive("fontStyle", { fontSize: selectedFontSize })) {
            editor.chain().setFontSize(selectedFontSize).run();
        }
    }, [editor, selectedFontSize]);


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
                        <select 
                            id="font-selector" 
                            className={styles.fontSelector} 
                            onChange={(e)=> {
                                handleFontFamilyChange(e.target.value);
                                setSelectedFont(e.target.value)
                            }}
                            style={{ fontFamily: selectedFont }}
                        >
                            <option value="Arial">Arial</option>
                            <option value="Calibri">Calibri</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Times New Roman">Times New Roman</option>
                            {fonts.map((font)=> (
                                <option key={font.family} value={font.family} style={{ fontFamily: font.family }}>
                                    {font.family}
                                </option>
                            ))}
                        </select>
                        <div className={styles.fontSizes}>
                            <select 
                                id="font-size" 
                                className={styles.fontSizeSelector}
                                onChange={(e)=> {
                                    handleFontSizeChange(e.target.value);
                                    setSelectedFontSize(e.target.value)
                                }}
                                value={selectedFontSize}
                            >
                                {fontSize.map((font, index)=> (
                                    <option key={index} value={font}>{font}</option>
                                ))}
                            
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
                                    AlignJustify: false,
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
                                    AlignJustify: false,
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
                                    AlignJustify: false,
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
                                    AlignJustify: false,
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
                                    AlignJustify: false,
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
                                    <StyledMenuItem onClick={ ()=>{

                                        handleEditorToolbarActions({
                                            Bold: false,
                                            Italic: false,
                                            Underline: false,
                                            Strikethrough: false,
                                            AlignLeft: true,
                                            AlignCenter: false,
                                            AlignRight: false,
                                            AlignJustify: false,
                                            List: false,
                                            ListOrdered: false,
                                            Code: false,
                                            Link: false
                                        });
                                        handleClose();
                                    }
                                    }>
                                        <AlignLeft className={styles.icon} /> <span>Align Left</span>
                                    </StyledMenuItem>

                                    <StyledMenuItem onClick={()=> {
                                        handleClose();
                                        handleEditorToolbarActions({
                                            Bold: false,
                                            Italic: false,
                                            Underline: false,
                                            Strikethrough: false,
                                            AlignLeft: false,
                                            AlignCenter: true,
                                            AlignRight: false,
                                            AlignJustify: false,
                                            List: false,
                                            ListOrdered: false,
                                            Code: false,
                                            Link: false
                                        })
                                    }}
                                    >
                                        <AlignCenter className={styles.icon} /> <span>Align Center</span>
                                    </StyledMenuItem>
                                    <StyledMenuItem onClick={()=> {
                                        handleClose();
                                        handleEditorToolbarActions({
                                            Bold: false,
                                            Italic: false,
                                            Underline: false,
                                            Strikethrough: false,
                                            AlignLeft: false,
                                            AlignCenter: false,
                                            AlignRight: true,
                                            AlignJustify: false,
                                            List: false,
                                            ListOrdered: false,
                                            Code: false,
                                            Link: false
                                        })
                                    }}>
                                        <AlignRight className={styles.icon} /> <span>Align Right</span>
                                    </StyledMenuItem>
                                    <StyledMenuItem onClick={()=> {
                                        handleClose();
                                        handleEditorToolbarActions({
                                            Bold: false,
                                            Italic: false,
                                            Underline: false,
                                            Strikethrough: false,
                                            AlignLeft: false,
                                            AlignCenter: false,
                                            AlignRight: false,
                                            AlignJustify: true,
                                            List: false,
                                            ListOrdered: false,
                                            Code: false,
                                            Link: false
                                        })
                                    }}>
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
                            <button 
                                className={styles.optionButton}
                                onClick={()=> editor?.chain().focus().undo().run()}
                            >
                                <Undo className={styles.icon} />
                            </button>
                            <button 
                                className={styles.optionButton}
                                onClick={()=> editor?.chain().focus().redo().run()}
                            >
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
                    {
                        pages.map((pageContent, index)=> (
                            <div key={index} className={styles.page}>
                                <EditorContent 
                                    editor={editor}
                                    className={styles.editorTab}
                                    ref={index === pages.length - 1 ? editorRef : null}
                                />
                            </div>
                        ))
                    }
                    {/* <EditorContent 
                        editor={editor}
                        className={styles.editorTab}
                        ref={editorRef}
                    /> */}
                </main>
            </div>
        </div>
    )
}

export default TextEditorPage;