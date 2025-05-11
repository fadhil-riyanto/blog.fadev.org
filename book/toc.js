// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded "><a href="sysprog/readme-sysprog.html"><strong aria-hidden="true">1.</strong> System programming</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="sysprog/data_movement_changes_a_destination_register.html"><strong aria-hidden="true">1.1.</strong> How data movement changes a destination register</a></li><li class="chapter-item expanded "><a href="sysprog/embed_asm.html"><strong aria-hidden="true">1.2.</strong> General embedded ASM linked in C</a></li><li class="chapter-item expanded "><a href="sysprog/movsbl_movzbl.html"><strong aria-hidden="true">1.3.</strong> Move sign &amp; zero-extends a single byte</a></li><li class="chapter-item expanded "><a href="sysprog/movabsq.html"><strong aria-hidden="true">1.4.</strong> movabsq</a></li><li class="chapter-item expanded "><a href="sysprog/x86_64_reg.html"><strong aria-hidden="true">1.5.</strong> x86_64 register (fiks technical grade)</a></li><li class="chapter-item expanded "><a href="sysprog/movabsq_movq_vs.html"><strong aria-hidden="true">1.6.</strong> analisis kenapa pakai movabsq, daripada movq</a></li><li class="chapter-item expanded "><a href="sysprog/0xffffffff_analysis_movq.html"><strong aria-hidden="true">1.7.</strong> analisis patch movq pakai 0xffffffff</a></li></ol></li><li class="chapter-item expanded "><a href="rust/readme-rust-stuff.html"><strong aria-hidden="true">2.</strong> Rust stuff</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="rust/cursor_1.html"><strong aria-hidden="true">2.1.</strong> Rust Cursor &amp; fseek concept</a></li><li class="chapter-item expanded "><a href="rust/bytes_has_remaining.html"><strong aria-hidden="true">2.2.</strong> Rust bytes has_remaining() method</a></li><li class="chapter-item expanded "><a href="rust/into_box_error_analysis.html"><strong aria-hidden="true">2.3.</strong> How Rust into() Box + Error analysis</a></li><li class="chapter-item expanded "><a href="rust/buffer_bytes_advance.html"><strong aria-hidden="true">2.4.</strong> Rust buffer advance</a></li><li class="chapter-item expanded "><a href="rust/rust_RESP_get_line_analysis.html"><strong aria-hidden="true">2.5.</strong> Rust RESP get_line analysis</a></li><li class="chapter-item expanded "><a href="rust/postgresql_get_generic_function_signature.html"><strong aria-hidden="true">2.6.</strong> postgresql - get() generic function signature</a></li></ol></li><li class="chapter-item expanded "><a href="math/readme-math.html"><strong aria-hidden="true">3.</strong> Math</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="math/set_formula_1.html"><strong aria-hidden="true">3.1.</strong> Set formula</a></li><li class="chapter-item expanded "><a href="math/set_stuff.html"><strong aria-hidden="true">3.2.</strong> Set stuff</a></li><li class="chapter-item expanded "><a href="math/logika.html"><strong aria-hidden="true">3.3.</strong> Logika</a></li><li class="chapter-item expanded "><a href="math/kumpulan_soal_matematika_diskrit.html"><strong aria-hidden="true">3.4.</strong> kumpulan soal Matematika Diskrit</a></li><li class="chapter-item expanded "><a href="math/degree_vector_formula_origin.html"><strong aria-hidden="true">3.5.</strong> asal usul rumus sudut vektor</a></li><li class="chapter-item expanded "><a href="math/transformasi_elementer.html"><strong aria-hidden="true">3.6.</strong> transformasi elementer</a></li></ol></li><li class="chapter-item expanded "><a href="crypto/readme-crypto.html"><strong aria-hidden="true">4.</strong> Cryptography</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="crypto/alur_koneksi_RPC_telegram.html"><strong aria-hidden="true">4.1.</strong> Alur koneksi ke RPC server telegram</a></li></ol></li><li class="chapter-item expanded "><a href="server/readme-server.html"><strong aria-hidden="true">5.</strong> Server</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="server/postgresql_db_creation.html"><strong aria-hidden="true">5.1.</strong> PostgreSQL database creation flow</a></li><li class="chapter-item expanded "><a href="server/sqlx-migration-tools.html"><strong aria-hidden="true">5.2.</strong> how to use SQLX cli tools for db migration such laravel migrations</a></li></ol></li><li class="chapter-item expanded "><a href="other/other-readme.html"><strong aria-hidden="true">6.</strong> Other</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="other/resume-alpro.html"><strong aria-hidden="true">6.1.</strong> Resume alpro</a></li><li class="chapter-item expanded "><a href="other/resume-alpro-dll.html"><strong aria-hidden="true">6.2.</strong> Resume alpro double linkedlists</a></li><li class="chapter-item expanded "><a href="other/rumus-sector-disk-linux.html"><strong aria-hidden="true">6.3.</strong> Rumus sector disk Linux</a></li><li class="chapter-item expanded "><a href="other/regex-notes.html"><strong aria-hidden="true">6.4.</strong> Regex notes</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
