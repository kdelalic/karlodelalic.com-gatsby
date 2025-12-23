RESUME_FILE_DIR="public"
RESUME_FILE_NAME="resume.pdf"
RESUME_FILE_PATH=$RESUME_FILE_DIR/$RESUME_FILE_NAME

rm -f $RESUME_FILE_PATH

# Pull latest resume from auto-resume releases
LATEST_RESUME=`curl -s https://api.github.com/repos/kdelalic/auto-resume/releases/latest \
    | grep "browser_download_url" \
    | cut -d : -f 2,3 \
    | tr -d \"`

curl -L $LATEST_RESUME -o $RESUME_FILE_PATH
