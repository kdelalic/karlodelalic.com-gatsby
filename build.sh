rm static/resume.pdf

# Pull latest resume from auto-resume releases
curl -s https://api.github.com/repos/kdelalic/auto-resume/releases/latest \
    | grep "browser_download_url" \
    | cut -d : -f 2,3 \
    | tr -d \" \
    | wget -i - -P static --no-check-certificate
