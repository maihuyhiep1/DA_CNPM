1. Tạo bình luận
URL: /comments
Phương thức: POST
Body yêu cầu:
          {
            "postId": 1,
            "content": "Nội dung bình luận",
            "userId": 123,
            "commentId": null // Nếu là trả lời bình luận, điền ID của bình luận được trả lời
          }
Kết quả:
Thành công:
          {
            "success": true,
            "message": "Tạo comment thành công!",
            "data": { "id": 1, "postId": 1, "content": "Nội dung", ... }
          }
Lỗi:
          {
            "success": false,
            "message": "Lỗi cụ thể",
            "data": null
          }



2. Cập nhật bình luận
URL: /comments/:id
Phương thức: PUT
Body yêu cầu:
          {
            "content": "Nội dung mới"
          }
Kết quả:
Thành công:
          {
            "success": true,
            "message": "Cập nhật comment thành công!",
            "data": { "id": 1, "content": "Nội dung mới", ... }
          }
Không tìm thấy:
          {
            "success": false,
            "message": "Comment không tồn tại!",
            "data": null
          }


3. Xoá bình luận
URL: /comments/:id
Phương thức: DELETE
Kết quả:
Thành công:
          {
            "success": true,
            "message": "Xoá comment thành công!",
            "data": { "comment": { "id": 1, "content": "Nội dung", ... } }
          }
Không tìm thấy:
          {
            "success": false,
            "message": "Comment không tồn tại!",
            "data": null
          }


4. Lấy bình luận của một bài viết
URL: /comments/post/:id
Phương thức: GET
Kết quả:
Thành công:
          {
            "success": true,
            "message": "Lấy tất cả comment của post 1 thành công!",
            "data": [
              [
                  {
                      "id": 1,
                      "content": "cmt3",
                      "userId": 1,
                      "postId": 1,
                      "commentId": null, // comment gốc
                  },
                  {
                      "id": 11,
                      "content": "cmt33",
                      "userId": 1,
                      "postId": 1,
                      "commentId": 1,    // comment reply cho comment có id 1
                  }
              ],
               // nhiều list
            ]
          }
Không tìm thấy bài viết:
          {
            "success": false,
            "message": "Post không tồn tại!",
            "data": null
          }
