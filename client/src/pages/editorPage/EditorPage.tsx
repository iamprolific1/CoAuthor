import { useEffect, useState, useRef } from 'react';
import styles from "./index.module.css";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { Editor, EditorState, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";

const PAGE_HEIGHT = 1123;
// const PAGE_CONTENT_LIMIT = 1000;
const PAGE_PADDING = 50;
const CONTENT_HEIGHT = PAGE_HEIGHT - 2 * PAGE_PADDING;

const EditorPage = ()=> {

    // const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [pages, setPages] = useState<EditorState[]>([
        EditorState.createEmpty(), // initialize with one empty page
    ]);

    const editorRefs = useRef<(HTMLDivElement | null)[]>([]);
    // const [horizontalBounds, setHorizontalBounds] = useState<{start: number, end: number}>({ start: 0, end: 800});
    // const [verticalBounds, setVerticalBounds] = useState<{start: number, end: number}>({ start: 0, end: 1000 });

    const updateRulerTicks = ()=> {
        const horizontalRuler = document.querySelector(`.${styles.horizontalRuler} .${styles.ticks}`);
        const verticalRuler = document.querySelector(`.${styles.verticalRuler} .${styles.ticks}`);
        
        //check for availability
        if(horizontalRuler && verticalRuler) {
            horizontalRuler.innerHTML = '';
            verticalRuler.innerHTML = '';
        }

        // Horizontal Ruler
        for(let i = 0; i < window.innerWidth; i += 50) {
            const tick = document.createElement('div');
            tick.textContent = `${i}`;
            horizontalRuler?.appendChild(tick);
        }

        // Vertical Ruler 
        for(let i = 0; i < window.innerHeight; i += 50) {
            const tick = document.createElement('div');
            tick.textContent = `${i}`;
            verticalRuler?.appendChild(tick);
        }
    };


    const handleEditorChange = (editorState: EditorState, pageIndex: number) => {
        const updatedPages = [...pages];
        updatedPages[pageIndex] = editorState;

        // Dynamically check content height
        const currentEditorElement = editorRefs.current[pageIndex];
        if(currentEditorElement) {
            const contentHeight = currentEditorElement.scrollHeight;
            if(contentHeight > CONTENT_HEIGHT) {
                // overflow detected, get plain text
                const plainText = editorState.getCurrentContent().getPlainText();
                
                // Estimate overflow index based on rendered height
                const overflowIndex = Math.floor((plainText.length * CONTENT_HEIGHT) / contentHeight);
                const currentPageText = plainText.slice(0, overflowIndex);
                const overflowText = plainText.slice(overflowIndex);

                // ensure the next page exists
                if(!updatedPages[pageIndex + 1]) {
                    updatedPages.push(EditorState.createEmpty());
                }

                // update next page with overflow content
                const nextContentState = ContentState.createFromText(
                    overflowText,
                    updatedPages[pageIndex + 1].getCurrentContent().getPlainText()
                );
                updatedPages[pageIndex + 1] = EditorState.createWithContent(nextContentState);

                // update the current page with trimmed content
                const currentContentState = ContentState.createFromText(currentPageText);
                updatedPages[pageIndex] = EditorState.createWithContent(currentContentState);
            }
        }

        setPages(updatedPages)
    };




    useEffect(()=> {
        updateRulerTicks();
        window.addEventListener('resize', updateRulerTicks);
        return ()=> window.removeEventListener('resize', updateRulerTicks);
    }, []);

    

    return (
        <div className={styles.editorPage}>
            {/* Sidebar */}
            <aside className={styles.editorSidebar}>
                <h3>Real-Time Collaboration</h3>
                <div className={styles.presenceSection}>
                    <h4>Active Users</h4>
                    <div className={styles.user}>
                        <div className={styles.avatar}>JD</div>
                        <p>John Doe <span>(Editing)</span></p>
                    </div>
                    <div className={styles.user}>
                        <div className={styles.avatar}>AL</div>
                        <p>Alice Lee <span className={styles.viewingStatus}>(Viewing)</span></p>
                    </div>
                </div>

                <h4>Comments</h4>
                <div className={styles.commentsSection}>
                    <div className={styles.comment}>
                        <div className={styles.commentHeader}>
                            <div className={styles.avatar}>JD</div>
                            <span className={styles.author}>John Doe</span>
                        </div>
                        <p>This section needs better formatting.</p>
                        <small>5 mins ago</small>
                    </div>
                    <div className={styles.comment}>
                        <div className={styles.commentHeader}>
                            <div className={styles.avatar}>JD</div>
                            <span className={styles.author}>John Doe</span>
                        </div>
                        <p>This section needs better formatting.</p>
                        <small>5 mins ago</small>
                    </div>
                    <div className={styles.comment}>
                        <div className={styles.commentHeader}>
                            <div className={styles.avatar}>JD</div>
                            <span className={styles.author}>John Doe</span>
                        </div>
                        <p>This section needs better formatting.</p>
                        <small>5 mins ago</small>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className={styles.editorContainer}>
                {/* Header (toolbars) */}
                <header className={styles.editorToolbar}>
                    <div className={styles.toolbarMainButtons}>
                        <button>File</button>
                        <button>Edit</button>
                        <button>View</button>
                        <button>Insert</button>
                        <button>Format</button>
                        <button>Tools</button>
                        <button>Table</button>
                        <button>Layout</button>
                        <button>Help</button>
                        
                        <select id="font-selector" className={styles.fontSelector}>
                            <option value="Arial" style={{ fontFamily: 'Arial'}}>Arial</option>
                            <option value="Georgia" style={{ fontFamily: 'Georgia'}}>Georgia</option>
                            <option value="Courier New" style={{ fontFamily: 'Courier New'}}>Courier New</option>
                            <option value="Times New Roman" style={{ fontFamily: 'Times New Roman'}}>Times New Roman</option>
                        </select>
                    </div>
                    <div className={styles.toolbarOptions}>
                        <button>B</button>
                        <button>I</button>
                        <button>U</button>
                        <select>
                            <option>Normal Text</option>
                            <option>Heading 1</option>
                            <option>Heading 2</option>
                            <option>Heading 3</option>
                        </select>
                        <button>Bullet List</button>
                        <button>Number List</button>
                        <button>Insert Link</button>
                        <button>Clear Formatting</button>
                        <button><UndoIcon /></button>
                        <button><RedoIcon /></button>
                        <button className={styles.saveButton}>Save</button>
                        <button className={styles.exportButton}>Export</button>
                    </div>
                </header>

                <div className={styles.editorWrapper}>
                    {/* Horizontal Ruler */}
                    <div className={styles.horizontalRuler}>
                        <div 
                        className={styles.startMarker} 
                        draggable={true}
                        // onDrag={(e)=> handleHorizontalDrag(e, 'start')}
                        ></div>
                        <div className={styles.ticks}></div>
                        <div 
                        className={styles.endMarker} 
                        draggable={true}
                        // onDrag={(e)=> handleHorizontalDrag(e, 'end')}
                        ></div>
                    </div>
                    {/* Vertical Ruler */}
                    <div className={styles.verticalRuler}>
                        <div 
                        className={styles.startMarker} 
                        draggable={true}
                        // onDrag={(e)=> handleVerticalDrag(e, 'start')}
                        ></div>
                        <div className={styles.ticks}></div>
                        <div 
                        className={styles.endMarker} 
                        draggable={true}
                        // onDrag={(e)=> handleVerticalDrag(e, 'end')}
                        ></div>
                    </div>

                    {/* Editor panel */}
                    <div 
                    className={styles.editor} 
                    >
                        {pages.map((pageContent, index)=> (
                            <div 
                            className={styles.editorPages} 
                            key={index} 
                            id={`page-${index}`}
                            ref={(el)=> (editorRefs.current[index] = el)}
                            >
                                <div className={styles.editorContent}>

                                    <Editor 
                                        editorState={pageContent} 
                                        onChange={(editorState)=> handleEditorChange(editorState, index)}
                                        placeholder='Start typing...'
                                    />
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </main>

        </div>
    )
}

export default EditorPage;