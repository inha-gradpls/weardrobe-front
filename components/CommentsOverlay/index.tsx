'use client';
import styles from './commentsOverlay.module.css';
import BottomModal from '../BottomModal';
import TopBar from '../TopBar';
import { getComments, registerComment } from '@/utils/api';
import { useCallback, useRef, useState } from 'react';
import { dateToStr, useInfiniteScroll } from '@/utils/uiHelper';
import UserCard from '../UserCard';
import Input from '../Input';
import IconButton from '../Button/IconButton';

interface CommentsOverlayProps {
  isSeller: boolean;
  id: number;
  onClose: () => void;
}

export default function CommentsOverlay({ onClose, id, isSeller }: CommentsOverlayProps) {
  const lastItemRef = useRef<HTMLDivElement>(null);
  const [submit, setSubmit] = useState<boolean>(false);

  const apiCall = useCallback(
    async (page: number, pageSize: number) => {
      if (submit) return [];
      return await getComments(id, page);
    },
    [id, submit],
  );

  const { result, loading } = useInfiniteScroll(apiCall, 20, lastItemRef);

  return (
    <div>
      <BottomModal onClose={onClose} fill={true}>
        <TopBar backButton={true} onBack={onClose}>
          <h3>댓글</h3>
        </TopBar>
        <div className={`innerContent ${styles.container}`}>
          <div className={styles.items}>
            {result.map((v) => (
              <Comment
                key={v.id}
                userId={v.userId}
                content={v.content}
                userImage={v.userImageUrl}
                nickname={v.userNickname}
                createdDate={v.createdDate}
              />
            ))}
            <div ref={lastItemRef} className={styles.loading}>
              {loading && <p>로드중</p>}
            </div>
          </div>
          <form
            className={styles.input}
            onSubmit={(e) => {
              e.preventDefault();
              if (submit) return;
              setSubmit(true);
              // read form data to json
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);

              // simple validation
              const comment = formData.get('comment');
              if (!comment) {
                alert('내용을 확인해 주세요');
                setSubmit(false);
                return;
              }

              // request
              (async () => {
                const res = await registerComment(id, comment.toString());
                if (res === undefined) {
                  alert('실패');
                  setSubmit(false);
                  return;
                }
                setSubmit(false);
              })();
            }}
          >
            <Input type="text" name="comment" fill={true} />
            <IconButton type="submit" icon="send" styleType="transparent" />
          </form>
        </div>
      </BottomModal>
    </div>
  );
}

interface CommentProps {
  createdDate: string;
  userId: number;
  content: string;
  userImage: string;
  nickname: string;
}

function Comment({ userId, content, userImage, nickname, createdDate }: CommentProps) {
  return (
    <div className={styles.comment}>
      <p className={styles.date}>{dateToStr(createdDate)}</p>
      <UserCard userId={userId} nickname={nickname} profilePic={userImage} />
      <p>{content}</p>
    </div>
  );
}
