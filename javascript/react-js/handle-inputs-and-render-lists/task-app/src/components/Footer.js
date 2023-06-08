function Footer({initialYear}) {
    function getCopyrightString() {
        const currentYear = new Date().getFullYear();
        return currentYear === initialYear
            ? initialYear
            : `${initialYear}-${currentYear}`;
    }

    return (
        <footer>
            <p>
                <small>
                    Source Code &copy; <time id="copyright-current-year">{getCopyrightString()}</time> Todd Brentlinger, Santa Cruz, CA, USA. All Rights Reserved.
                </small>
            </p>
        </footer>
    );
}

export default Footer;
