<template>
    <div @click="markAsUnread">
        <p class="mb-0">
            <span class="vh-text-bold">
                {{ item.notified_by.full_name }}
            </span>{{ item.message }}.
        </p>
        <!-- <small v-if="!markLoading">
            <span v-if="!item.is_read">
                UNREAD
            </span>
            <span v-else>
                READ
            </span>
        </small>
        <small v-else>
            Loading...
        </small> -->
    </div>
</template>

<script>
import apiClient from '@/services/index';


export default
{
    props:
    {
        item: Object,
        selectItem: Function,
        updateItem: Function,
    },

    data()
    {
        return {
            markLoading: false
        }
    },

    methods:
    {
        async markAsUnread()
        {
            try
            {
                if(!this.item.is_read)
                {
                    this.selectItem(this.item);

                    this.markLoading = true;

                    const response = await apiClient.put(`/borrow-notification/${this.item.id}/read`);
                    console.log(response.data);

                    this.markLoading = false;
                    this.updateItem(response.data);
                }
            }
            catch(error)
            {
                console.error(error)
            }
            finally
            {
                this.markLoading = false;
            }
            
        }
    }
}
</script>