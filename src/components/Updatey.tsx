import { useEffect } from 'react';
import { useUpdateStatus } from '../apis/github';
import { useRoute } from '../router/hooks';
import { Page } from '../storage/page';
import { update } from '../updatey';

export function Updatey() {
    const shouldUpdate = useUpdateStatus();
    const page = useRoute();
    useEffect(() => {
        if (shouldUpdate && page == Page.SCHEDULE) {
            console.log('wee woo!');
            update();
        }
    }, [shouldUpdate, page]);
    return <></>;
}
