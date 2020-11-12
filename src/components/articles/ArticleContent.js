import React from "react";
import { Box, Grid, Hidden } from "@material-ui/core";
import { HEIGHT_APP_BAR } from "layouts/MainLayout/components/CustomAppBar";
import AsideAuthorButton from "./AsideAuthorButton";

const ArticleContent = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <Hidden mdDown>
          <Box
            position="sticky"
            alignSelf="flex-start"
            top={`calc(${HEIGHT_APP_BAR} + 112px)`}
            pr={2}
          >
            <AsideAuthorButton />
          </Box>
        </Hidden>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box dangerouslySetInnerHTML={{ __html: DEMO_CONTENT }} fontSize={16} />
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
};

const DEMO_CONTENT = `
Sau khi Ford bị bắn, Dolores và Teddy điên cuồng tìm giết các thành viên hội đồng đang chạy trốn. Kế hoạch của cô là chiếm đóng cả thế giới loài người. Bernard bỏ trốn với Hale, cả hai đến được một cơ sở bí mật, nơi các “drone host” đang trích xuất thông tin từ các host thường nhằm theo dõi các vị khách trong công viên. Charlotte được ai đó bên ngoài công viên thông báo họ sẽ không được giải cứu trừ khi có được “Kiện hàng” hay chính là Peter Abernathy, cùng tất cả IP được lưu trữ trong bộ nhớ của ông. Bernard và Hale lần theo dấu Peter tới một băng đảng du côn đang cầm tù các thành viên hội đồng. Họ không thành công, Hale cưỡi ngựa tẩu thoát về trụ sở chính, trong khi Bernard và Abernathy bị nhóm Confederados bắt giữ.
</br>
Man in Black biết được Ford đã tạo ra một trò chơi mới cho mình, có tên “The Door”, giờ đây nó trở thành trò chơi sinh tử khi các host đã có thể giết người. Man in Black tìm được người bạn cũ Lawrence để giúp mình thực hiện thử thách. Ông thú nhận với Lawrence bản thân không thích phán quyết mà anh ta phải chịu – về cơ bản Man in Black đang cố gắng bồi đắp cho tội lỗi của bản thân, ông quyết đốt Westworld thành tro bụi. Có vẻ như cả Dolores và Man in Black đang chạy đua để tìm thứ “vũ khí” bí ẩn, nhưng cả hai có mục đích sử dụng vô cùng khác nhau.
</br>
Maeve nhờ sự giúp đỡ của Lee Sizemore để tìm con gái mình. Họ tìm thấy Hector rồi cùng tiến vào công viên. Maeve, Hector và Sizemore bị phục kích bởi một đám Ghost Nation nên đành quay xuống lòng đất. Tại đây, họ đoàn tụ cùng nhiều người quen cũ – Armistice, Felix và Sylvester. Nhóm người hăm hở tiến vào công viên cùng nhau. Tuy vậy cả hội đi lạc trong đường hầm và đến nhầm Thế giới Shogun.
Sau khi Ford bị bắn, Dolores và Teddy điên cuồng tìm giết các thành viên hội đồng đang chạy trốn. Kế hoạch của cô là chiếm đóng cả thế giới loài người. Bernard bỏ trốn với Hale, cả hai đến được một cơ sở bí mật, nơi các “drone host” đang trích xuất thông tin từ các host thường nhằm theo dõi các vị khách trong công viên. Charlotte được ai đó bên ngoài công viên thông báo họ sẽ không được giải cứu trừ khi có được “Kiện hàng” hay chính là Peter Abernathy, cùng tất cả IP được lưu trữ trong bộ nhớ của ông. Bernard và Hale lần theo dấu Peter tới một băng đảng du côn đang cầm tù các thành viên hội đồng. Họ không thành công, Hale cưỡi ngựa tẩu thoát về trụ sở chính, trong khi Bernard và Abernathy bị nhóm Confederados bắt giữ.
</br>
Man in Black biết được Ford đã tạo ra một trò chơi mới cho mình, có tên “The Door”, giờ đây nó trở thành trò chơi sinh tử khi các host đã có thể giết người. Man in Black tìm được người bạn cũ Lawrence để giúp mình thực hiện thử thách. Ông thú nhận với Lawrence bản thân không thích phán quyết mà anh ta phải chịu – về cơ bản Man in Black đang cố gắng bồi đắp cho tội lỗi của bản thân, ông quyết đốt Westworld thành tro bụi. Có vẻ như cả Dolores và Man in Black đang chạy đua để tìm thứ “vũ khí” bí ẩn, nhưng cả hai có mục đích sử dụng vô cùng khác nhau.
</br>
Maeve nhờ sự giúp đỡ của Lee Sizemore để tìm con gái mình. Họ tìm thấy Hector rồi cùng tiến vào công viên. Maeve, Hector và Sizemore bị phục kích bởi một đám Ghost Nation nên đành quay xuống lòng đất. Tại đây, họ đoàn tụ cùng nhiều người quen cũ – Armistice, Felix và Sylvester. Nhóm người hăm hở tiến vào công viên cùng nhau. Tuy vậy cả hội đi lạc trong đường hầm và đến nhầm Thế giới Shogun.
`;

export default ArticleContent;
