import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Paper, makeStyles, Typography, Box, Hidden } from "@material-ui/core";
import { LangConstant } from "const";
import TabPanel from "components/TabPanel";

const TermAndPrivacy = ({selectedTab}) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INTRODUCTIONS);

  return (
		<TabPanel index={1} value={selectedTab}>
			<Paper className={classes.root}>
				<Hidden xsDown>
          <Typography className={classes.title}>{getLabel("TXT_TERM_AND_PRIVACY")}</Typography>
        </Hidden>

        <Box className={classes.contentBox}>
          <Box className={classes.contentItem}>
            <Typography className={classes.textBold}>ĐIỀU KHOẢN SỬ DỤNG</Typography>
            <Typography className={classes.textBold}>Chấp thuận điều khoản</Typography>
          </Box>
          <Box className={classes.contentItem}>
            <Typography>Bằng việc truy cập và/hoặc sử dụng trang web/ứng dụng này, bạn đã đồng ý với những điều khoản của chúng tôi. 
              Nếu không chấp thuận với bất cứ điều khoản nào, bạn có thể dừng việc truy cập. 
            </Typography>
            <Typography>Sửa đổi điều khoản</Typography>
          </Box>
          <Box className={classes.contentItem}>
            <Typography>Các điều khoản có thể được chỉnh sửa hoặc bổ sung cho phù hợp. 
              Trừ trường hợp chúng tôi đặt giới hạn về thời gian có hiệu lực của điều khoản đó. 
              Việc tiếp tục truy cập và/hoặc sử dụng GAT đồng nghĩa việc bạn chấp thuận với những điều khoản đã được chỉnh sửa, bổ sung.
            </Typography>
            <Typography>Bổ sung điều khoản</Typography>
          </Box>
          <Box className={classes.contentItem}>
            <Typography>Bên cạnh những điều khoản được nêu dưới đây, khi sử dụng gói dịch vụ đặc biệt, chương trình khuyến mãi đặc biệt, 
              sản phẩm đặc biệt, dịch vụ hoặc tính năng đặc biệt từ chúng tôi trong một khoảng thời gian nhất định, 
              bạn có thể cần phải tuân theo hướng dẫn, nguyên tắc (được chỉnh sửa bổ sung) đi kèm. 
              Tất cả các điều khoản bổ sung này đều phải kết hợp bằng cách tham chiếu vào các điều khoản, 
              trong trường hợp có sự mâu thuẫn giữa các điều khoản bổ sung này và các Điều khoản, Điều khoản sẽ kiểm soát.
            </Typography>
            <Typography>NỀN TẢNG GAT</Typography>
            <Typography>
              GAT là nền tảng online mà người dùng có thể mượn sách, viết review sách và quản lý tủ sách thông qua app trên thiết bị di động và website. 
              GAT cung cấp một nền tảng công nghệ giúp người dùng mượn sách và chia sẻ sách với những người gần bạn, từ đó giúp nâng cao văn hóa đọc, 
              lan tỏa thói quen đọc sách trong cộng đồng.
            </Typography>
            <Typography>CHẤM DỨT HOẶC SỬA ĐỔI HỢP ĐỒNG BỞI GAT</Typography>
            <Typography>Chấm dứt hoặc Sửa đổi</Typography>
          </Box>
          <Box className={classes.contentItem}>
            <Typography>- Vào bất cứ thời điểm nào và không có báo trước, chúng tôi có thể: (1) chấm dứt, hủy, tạm dừng hoặc 
              (2) ngừng kết nối, điều chỉnh và thay thế thông tin bất kỳ hay chính sách sử dụng của bạn.
            </Typography>
            <Typography>- Nếu chúng tôi ngưng hợp đồng mà không có lý do, bạn sẽ được hoàn trả một phần phí từ dịch vụ bạn chưa dùng tới đã được trả trước.</Typography>
            <Typography>
              - Nếu chúng tôi phát hiện bạn vi phạm Điều khoản sử dụng thứ 8 và thứ 9 một cách trái phép thì chúng tôi hoàn toàn có quyền từ chối cung cấp dịch vụ cho bạn.
            </Typography>
            <Typography>
              - Chúng tôi không có trách nhiệm pháp lý đối với bạn hay bên thứ ba bất kỳ về việc chấp dứt hay điều chỉnh dịch vụ bất chấp lý do.
            </Typography>
            <Typography>
              - Bạn có quyền bày tỏ sự không hài lòng với hành động của chúng tôi bằng cách hủy hoặc chấm dứt sử dụng.
            </Typography>
            <Typography>Hoạt động Xâm phạm hay Hoạt động gian lận</Typography>
          </Box>
          <Box className={classes.contentItem}>
            <Typography>
              GAT - Give and Take the books không cho phép bất kỳ hành vi vi phạm bản quyền nào và có quyền yêu cầu thu hồi, 
              chấm dứt toàn bộ các lợi ích của người dùng nếu có phát hiện vi phạm. 
              Bất kỳ hành vi phạm pháp nào đều là cơ sở pháp lý để chúng tôi thực hiện hình phạt và hành động chấm dứt hợp đồng với người dùng. 
              Các hành vi phạm pháp này có thể sẽ được trình báo lên các cơ quan chức năng để xem xét và xử lý.
            </Typography>
            <Typography>THÔNG TIN ĐĂNG KÝ VÀ MẬT KHẨU</Typography>
            <Typography>
              Tính năng và tiện ích của chúng tôi trên app hoặc website có thể bị giới hạn một phần hay hoàn toàn dựa trên cơ sở vị trí địa lý, 
              tuổi tác và các tiêu chuẩn khác mà chúng tôi có quyền bổ sung, thay đổi. 
              Mong rằng người dùng sẽ thông cảm và hiểu cho chúng tôi nếu có sự huỷ hoặc miễn quyền truy cập của người dùng dựa trên các tiêu chuẩn trên.&nbsp;  
              <Typography component="span">
                CÁC ĐIỀU KHOẢN TRÊN CHỈ ÁP DỤNG CHO NGƯỜI DÙNG SINH SỐNG VÀ LÀM VIỆC TẠI VIỆT NAM. 
                CHÚNG TÔI SẼ CÓ MỘT SỐ ĐIỂU KHOẢN RIÊNG BIỆT ÁP DỤNG CHO NGƯỜI DÙNG TỪ NƠI KHÁC. CHÚNG TÔI KHÔNG CHẤP NHẬN NGƯỜI DÙNG ĐÃ BỊ CẤM HOẶC KHAI TRỪ TRƯỚC Đ Y. 
                KHI SỬ DỤNG DỊCH VỤ CỦA CHÚNG TÔI, NGƯỜI DÙNG NGHIÊM NHIÊN ĐỒNG Ý ĐIỀU KHOẢN MÌNH CƯ TRÚ HỢP PHÁP TẠI VIỆT NAM, CHƯA TỪNG BỊ KHAI TRỪ HAY CẤM SỬ DỤNG DỊCH VỤ. 
                TẤT CẢ MỌI TRUY CẬP ĐỀU LÀ TỰ NGUYỆN VÀ NGƯỜI DÙNG CÓ NGHĨA VỤ CHỊU TRÁCH NHIỆM ĐỐI VỚI LUẬT PHÁP QUỐC GIA VỚI CÁC QUY ĐỊNH INTERNET, EMAIL, DATA VÀ QUYỀN RIÊNG TƯ CÁ NHÂN.
              </Typography>
            </Typography>
            <Typography>
              Bạn đồng ý rằng các thông tin bạn cung cấp cho GAT lúc đăng ký và tại mọi thời điểm khác sẽ là sự thật, chính xác, và đầy đủ. Bạn cũng đồng ý rằng bạn sẽ đảm bảo rằng thông tin này được lưu giữ chính xác và cập nhật mọi lúc. Khi bạn đăng ký, bạn sẽ được yêu cầu tạo một mật khẩu. 
              Bạn hoàn toàn chịu trách nhiệm duy trì tính bảo mật của tài khoản và mật khẩu của bạn và để hạn chế truy cập vào máy tính của bạn, và bạn đồng ý nhận trách nhiệm cho tất cả các hoạt động diễn ra trong tài khoản của bạn.
            </Typography>
            <Typography>TÍNH RIÊNG TƯ</Typography>
            <Typography>
              Sự riêng tư của bạn là vô cùng quan trọng đối với GAT. Chính sách bảo mật của GAT đều được tham khảo kỹ lưỡng trước khi đưa vào. 
              Xin vui lòng đọc chính sách bảo mật một cách cẩn thận các thông tin có liên quan đến việc thu thập, sử dụng và tiết lộ thông tin cá nhân của bạn. Khi bạn sử dụng , các đối tác tương thích có quyền truy cập vào một số thông tin nhất định của bạn, chẳng hạn như tên và địa chỉ email. 
              Xin vui lòng xem Chính sách bảo mật để biết thêm thông tin.
            </Typography>
            <Typography>Các thông tin thu thập bởi ứng dụng:</Typography>
            <Typography>
              - Các thông tin và nội dung do bạn cung cấp khi sử dụng sản phẩm của chúng tôi: 
              bao gồm các thông tin đăng kí tài khoản, tạo và chia sẻ nội dung hay nhắn tin với người khác.
            </Typography>
            <Typography>
              - Cách sử dụng của bạn: chúng tôi thu thập thông tin về cách bạn sử dụng sản phẩm của chúng tôi như nội dung bạn xem, 
              các tính năng bạn sử dụng, các hành động bạn thực hiện
            </Typography>
            <Typography>
              - Thông tin về thiết bị: số nhận dạng duy nhất của thiết bị.
            </Typography>
            <Typography>
              - Dữ liệu từ cài đặt thiết bị: thông tin mà bạn cho phép chúng tôi nhận thông qua các cài đặt mà bạn bạn bật, ví dụ như quyền truy cập vào vị trí GPS, máy ảnh hoặc ảnh của bạn.
            </Typography>
            <Typography>Chúng tôi sử dụng thông tin thu thập như thế nào:</Typography>
            <Typography>
              - Cung cấp, cá nhân hoá và cải tiến sản phẩm: chúng tôi sử dụng thông tin chúng tôi có để có thể cung cấp các sản phẩm của mình, 
              bao gồm cả các chức năng cá nhân hoá và nội dung, cũng như đưa ra các gợi ý cho bạn trên sản phẩm của chúng tôi.
            </Typography>
            <Typography>
              - Cải thiện độ an toàn, tính toàn vẹn và bảo mật: chúng tôi sử dụng thông tin của mình để xác minh tài khoản và hoạt động, 
              giúp ngăn chặn các trải nghiệm tiêu cực, duy trì tính toàn vẹn của sản phẩm
            </Typography>
            <Typography>
              - Liên lạc với bạn: chúng tôi sử dụng thông tin mình có để gửi các thông báo về sản phẩm, các thông tin tiếp thị cũng như để phản hồi lại khi các bạn liên hệ với chúng tôi.
            </Typography>
            <Typography>HÀNH VI BỊ CẤM</Typography>
            <Typography>
              - Quấy rối, đe dọa, làm gián đoạn hoặc lừa gạt người dùng, các thành viên hoặc nhân viên của GAT hoặc Địa điểm hoặc 
              bằng cách khác tạo ra hoặc góp phần làm không an toàn, quấy rối, đe dọa hoặc tạo ra môi trường gây rối.
            </Typography>
            <Typography>
              - Cung cấp các dịch vụ không phù hợp, quảng cáo, kiến nghị, gửi thư rác hoặc “spam” cho người sử dụng.
            </Typography>
            <Typography>
              - Mạo danh người khác hoặc truy cập vào tài khoản của người dùng khác.
            </Typography>
            <Typography>
              - Chia sẻ mật khẩu GAT với bất kỳ bên thứ ba hoặc khuyến khích người sử dụng khác để làm như vậy.
              Cho phép bất cứ ai sử dụng bất kỳ không gian hoặc dịch vụ đặt dưới tên người dùng của bạn, bao gồm cả các người dùng khác
            </Typography>
            <Typography>
              - Xuyên tạc các nguồn, bản sắc, hay nội dung của sách
            </Typography>
            <Typography>
              - Tải lên tài liệu có bản quyền mà không phải là của riêng bạn hoặc bạn không có quyền hợp pháp để phân phối, trưng bày, và cho người khác tiếp cận; hoặc là
            </Typography>
            <Typography>NHỮNG HÌNH THỨC SỬ DỤNG BỊ CẤM</Typography>
            <Typography>
              Như một điều kiện của việc sử dụng trang của bạn, bạn sẽ không sử dụng trang cho bất cứ mục đích trái pháp luật hoặc bị cấm bởi những điều khoản này. 
              Bạn không thể sử dụng theo bất kỳ cách nào có thể gây tổn hại, quá tải, hay làm hỏng nó hoặc gây trở ngại đến việc sử dụng và quyền lợi của những người khác. 
              Bạn không thể cố gắng truy cập trái phép vào các trang web, hoặc bất kỳ phần nào của trang web, các tài khoản khác, các hệ thống máy tính hoặc mạng kết nối với các trang web, 
              hoặc bất kỳ phần nào của họ, thông qua hack, khai thác mật khẩu, hoặc bất kỳ phương tiện khác hoặc gây trở ngại hay cố gắng can thiệp vào hoạt động đúng đắn của các trang web hoặc bất kỳ hoạt động thực hiện trên trang. 
              Bạn không thể loại bỏ, né tránh, vô hiệu hóa, làm hỏng hoặc gây trở ngại cho tính năng bảo mật liên quan đến trang, mọi tính năng ngăn ngừa hoặc hạn chế sử dụng hoặc sao chép bất kỳ nội dung truy cập thông qua các trang, 
              hoặc bất kỳ tính năng mà thi hành những hạn chế về việc sử dụng trang hoặc nội dung trong đó. Bạn không được lấy hoặc cố lấy bất cứ thành phần hoặc thông tin nào thông qua trang web. 
              Bạn đồng ý không được phép sửa đổi trang web theo bất kỳ cách hoặc hình thức nào, không sử dụng các phiên bản sửa đổi của các trang web, bao gồm (nhưng không giới hạn) cho các mục đích đạt được quyền truy cập trái phép vào trang. 
              Bạn đồng ý rằng bạn sẽ không sử dụng robot hoặc bất kỳ hình thức tự động khác để truy cập vào các trang web. 
              GAT có quyền để từ chối cung cấp dịch vụ cho bạn.
            </Typography>
            <Typography>NỘI DUNG DO NGƯỜI DÙNG ĐƯA LÊN</Typography>
            <Typography>Tổng quan</Typography>
          </Box>
          <Box className={classes.contentItem}>
            <Typography>
              Trang web của chúng tôi cung cấp một số tính năng cho phép bạn và người dùng khác để gửi, đăng, và chia sẻ nội dung, trong đó có thể bao gồm những văn bản không giới hạn, 
              đồ họa và tác phẩm tranh ảnh, hoặc bất kỳ nội dung khác do bạn và người dùng khác thông qua trang (“Nội dung do người dùng đưa lên”). 
              GAT không đảm bảo việc giấu tên hoặc bí mật đối với bất kỳ người dùng GAT. Bạn hiểu và đồng ý rằng những nội dung do người dùng đưa lên có thể được công bố mà không có thông báo bổ sung hoặc có sự đồng ý của bạn và bạn nên cho rằng bất kỳ người nào (dù có hay không phải người dùng nền tảng GAT ‘), 
              bao gồm bất kỳ đối tác nào, có thể đọc bài đăng của bạn. GAT không chịu trách nhiệm về việc sử dụng hoặc tiết lộ bất kỳ thông tin mà bạn tiết lộ trong kết nối với người dùng gửi, bao gồm thông tin cá nhân. 
              Những nội dung do người dùng đưa lên có những nội dung được hiển thị cho mục đích cung cấp thông tin và phản ánh ý kiến. 
              Những nội dung này không được kiểm soát, và có thể không phản ánh quan điểm của GAT. 
              Điều này có nghĩa là bạn, không phải GAT, hoàn toàn chịu trách nhiệm cho tất cả người dùng gửi mà bạn tải lên, đăng, e-mail, chuyển giao, hoặc cung cấp thông qua trang.
            </Typography>
            <Typography>Sự cấp phép từ người dùng cho GAT</Typography>
            <Typography>
              Bạn giữ toàn quyền sở hữu trong những nội dung bạn đưa lên. Bằng việc đăng tải nội dung lên GAT, bạn đồng ý cấp GAT quyền sử dụng toàn cầu, không độc quyền, vĩnh viễn, 
              không thể thu hồi, tái cấp phép, và chuyển nhượng giấy phép sử dụng, tái sản xuất, phân phối, sửa đổi, điều chỉnh, dịch, 
              chuẩn bị sản phẩm phái sinh, trưng bày công khai, công bố, công khai thực hiện, và khai thác thông tin gửi do người dùng gửi từ bạn và phái sinh của chúng trong kết nối 
              với các trang web và GAT (và kế thừa của nó) kinh doanh, bao gồm, nhưng không giới hạn, để tiếp thị, quảng bá, và phân phối lại một phần hoặc tất cả các trang web (và các sản phẩm phái sinh đó), 
              trong bất kỳ định dạng phương tiện truyền thông, các kênh hiện tại hoặc được phát triển sau này.
            </Typography>
            <Typography>Việc Đại diện và Bảo đảm của Nội dung do Người dùng đưa lên</Typography>
            <Typography>
              Bạn hoàn toàn chịu trách nhiệm đối với Nội dung của riêng bạn và những hậu quả của việc đăng hoặc xuất bản chúng. 
              Bạn khẳng định, đại diện và bảo đảm rằng: (i) bạn sở hữu, hoặc có giấy phép, quyền, sự đồng ý, và cho phép sử dụng và ủy quyền cho GAT để sử dụng tất cả các bằng sáng chế, thương hiệu, 
              bản quyền hoặc quyền sở hữu khác đối với nội dung người dùng gửi lên của bạn để cho phép thu nhận và sử dụng của người dùng gửi của bạn theo cách của GAT và theo các quyền và giấy phép nêu trên, 
              và (ii) Nội dung do người dùng đưa lên của bạn và GAT không và sẽ không:
            </Typography>
            <Typography>
              - Vi phạm, chiếm đoạt bất kỳ bên thứ ba, bao gồm bất kỳ bản quyền, nhãn hiệu, bằng sáng chế, bí mật thương mại, quyền đạo đức,quyền riêng tư, quyền công khai, hoặc bất kỳ tài sản trí tuệ khác hoặc quyền sở hữu.
            </Typography>
            <Typography>
              - Chứa các tài liệu đó là bất hợp pháp, đe dọa, khiêu dâm, phân biệt chủng tộc, phỉ báng, bôi nhọ, hận thù, khiêu dâm, cố ý sai hoặc gây tổn hại cho bên thứ ba, thúc đẩy bất kỳ hoạt động bất hợp pháp hoặc gây 
              tổn hại cho các nhóm hoặc cá nhân, hoặc bao gồm hoặc chứa phần mềm, 
              virus máy tính, chào mời thương mại, vận động chính trị, thư dây chuyền, thư hàng loạt, bất kỳ hình thức “spam” hoặc tham chiếu đến các hoạt động bất hợp pháp, sơ suất hoặc quảng cáo sai sự thật.
            </Typography>
            <Typography>
              - Vi phạm các điều khoản này hoặc bất kỳ luật hoặc quy định hiện hành; hoặc phải xin một giấy phép hoặc trả tiền lệ phí hay tiền bản quyền cho bất kỳ bên thứ ba về việc thực hiện bất kỳ quyền được cấp trong Điều khoản này, 
              bao gồm, bằng cách ví dụ và không giới hạn, thanh toán bất kỳ tiền bản quyền cho bất kỳ chủ sở hữu quyền tác giả, bao gồm bất kỳ tiền bản quyền cho bất kỳ cơ quan, tổ chức thu thập, hoặc chủ thể khác mà hành quyền đó nhân danh người khác.
            </Typography>
            <Typography>
              GAT có thể, nhưng không bắt buộc phải, theo dõi và chỉnh sửa hoặc loại bỏ bất kỳ hoạt động hay những nội dung, bao gồm nhưng không giới hạn nội dung do GAT xác định tuỳ ý vi phạm các tiêu chuẩn của các trang web này. 
              GAT không chịu trách nhiệm cho bất kỳ nội dung do người dùng gửi.
            </Typography>
            <Typography>Người dùng gửi không chính xác hoặc mang tính xúc phạm</Typography>
          </Box>
          <Box className={classes.contentItem}>
            <Typography>Policy-content-10-5</Typography>
            <Typography>Phản hồi</Typography>
          </Box>
          <Box className={classes.contentItem}>
            <Typography>
              Nếu bạn gửi đến GAT bất kỳ ý kiến, báo cáo lỗi, phản hồi, hoặc đề nghị sửa đổi hoặc gợi ý đến qua trang, GAT sẽ có quyền sử dụng Phản hồi đó theo quyết định của mình, bao gồm, nhưng không giới hạn với việc đăng các đề nghị thay đổi đó lên trang. 
              Bạn đồng ý cấp GAT quyền vĩnh viễn, không thể thu hồi, hay cần giấy phép độc quyền cần thiết để kết hợp và sử dụng Phản hồi của bạn cho mục đích nào.
            </Typography>
            <Typography>QUYỀN SỞ HỮU</Typography>
            <Typography>
              Trang chủ GAT và các ứng dụng GAT được sở hữu và điều hành bởi công ty Cổ phần Sách và Phần mềm GAT. Các giao diện trực quan, đồ họa, thiết kế, biên soạn, thông tin, mã máy tính, sản phẩm, phần mềm (bao gồm bất kỳ phần mềm tải về), 
              dịch vụ, và tất cả các yếu tố khác của trang web được cung cấp bởi GAT.
            </Typography>
            <Typography>BÊN THỨ BA, SẢN PHẨM VÀ DỊCH VỤ; LIÊN KẾT</Typography>
            <Typography>
              Trang web có thể bao gồm các liên kết hoặc truy cập vào các trang web khác hoặc dịch vụ khác (“Trang Liên Kết”) như là một tiện nghi cho người sử dụng. 
              GAT không xác nhận bất cứ Trang Liên Kết này hoặc các thông tin, tài liệu, sản phẩm, hoặc dịch vụ có trên các trang web liên kết hoặc truy cập thông qua trang web liên kết khác. 
              Hơn nữa, GAT không bảo đảm rõ ràng hay ngụ ý liên quan đến các thông tin, tài liệu, sản phẩm, hoặc dịch vụ được chứa trên hoặc truy cập thông qua các trang web liên kết với. 
              BẤT CỨ RỦI RO NÀO XẢY RA KHI BẠN TIẾP CẬN VÀ SỬ DỤNG NHỮNG KẾT NỐI, KỂ CẢ NHỮNG THÔNG TIN, TÀI LIỆU, SẢN PHẨM, DỊCH VỤ VÀ NHỮNG KẾT NỐI TRÊN HOẶC SẴN CÓ TRÊN NHỮNG KẾT NỐI ĐÓ, 
              THUỘC TRÁCH NHIỆM CỦA RIÊNG BẠN. 
              Đôi khi các kế hoạch quảng cáo được cung cấp cùng với việc cung cấp các sản phẩm và dịch vụ của bên thứ ba.
              Chúng tôi không chịu trách nhiệm về các sản phẩm và dịch vụ được cung cấp bởi bên thứ ba đó, và những nguy cơ khi sử dụng các sản phẩm và dịch vụ đó thuộc trách nhiệm riêng của bạn.
            </Typography>
            <Typography>CẢNH BÁO</Typography>
            <Typography>
              Trừ khi có quy định rõ ràng, thông báo hợp pháp sẽ được gửi từ GAT và tới bạn qua địa chỉ email mà bạn cung cấp GAT trong quá trình đăng ký. 
              Thông báo sẽ được coi là bạn đã nhận được sau 24 giờ khi email được gửi đi, trừ khi bên gửi được thông báo rằng địa chỉ email không hợp lệ. 
              Ngoài ra, chúng tôi có thể cung cấp cho bạn thông báo pháp lý bằng thư đến địa chỉ được cung cấp trong quá trình đăng ký. 
              Trong trường hợp này, thông báo sẽ được coi là đã được gửi đi sau ba ngày, kể từ ngày gửi thư
            </Typography>
            <Typography>PHỦ NHẬN; KHÔNG BẢO ĐẢM</Typography>
            <Typography>
              CHỖ KHÔNG GIAN, HOẠT ĐỘNG, VÀ CÁC SẢN PHẨM VÀ DỊCH VỤ ĐƯỢC CUNG CẤP BỞI BÊN THỨ BA (VÀ CÁC MÔ TẢ ĐƯỢC CUNG CẤP BỞI BÊN THỨ BA ĐÓ), KHÔNG PHẢI BỞI GAT.
              THEO GIỚI HẠN CHO PHÉP BỞI PHÁP LUẬT HIỆN HÀNH, THAM GIA CÁC KHÔNG GIAN, HOẠT ĐỘNG VÀ SỬ DỤNG CÁC SẢN PHẨM VÀ DỊCH VỤ KHÔNG ĐƯỢC VẬN HÀNH BỞI GAT LÀ DO BẠN HOÀN TOÀN CHỊU RỦI RO. 
              TRONG MỌI TRƯỜNG HỢP GAT KHÔNG CHỊU TRÁCH NHIỆM CHO BẤT CỨ HÀNH ĐỘNG, LỖI HOẶC THIẾU SÓT CỦA BÊN THỨ BA, BAO GỒM NHƯNG KHÔNG GIỚI HẠN BẤT KỲ PHÁT SINH HOẶC LÀ BẤT CỨ CÁCH NÀO 
              LIÊN QUAN ĐẾN VIỆC THAM DỰ CỦA NGƯỜI DÙNG HOẶC THAM GIA MỘT LỚP HỌC, DỊCH VỤ, SẢN PHẨM HOẶC BỔ NHIỆM BỞI HOẶC ĐƯỢC THỰC HIỆN BỞI BÊN CUNG CẤP THỨ BA. 
              GAT KHÔNG PHẢI LÀ ĐẠI LÝ CỦA BÊN CUNG CẤP THỨ BA. 
              TRANG WEB VÀ BẤT CỨ PHẦN MỀM ĐƯỢC TẢI VỀ, NỘI DUNG, DỊCH VỤ, HOẶC ỨNG DỤNG KHẢ DỤNG CÙNG VỚI HOẶC QUA TRANG WEB ĐƯỢC CUNG CẤP VỚI MÁC “NHƯ LÀ” VÀ “NHƯ SẴN CÓ” KHÔNG MANG TÍNH BẢO ĐẢM RÕ RÀNG HAY NGỤ Ý. 
              THEO GIỚI HẠN CHO PHÉP BỞI PHÁP LUẬT HIỆN HÀNH, GAT ĐẠI DIỆN CHO CHÍNH NÓ VÀ NHỮNG NHÀ CUNG CẤP, CÁC ĐỐI TÁC, CHỐI BỎ VÀ LOẠI TRỪ MỌI BẢO ĐẢM, DÙ THEO QUY ĐỊNH RÕ RÀNG HAY NGỤ Ý, 
              BAO GỒM NHƯNG KHÔNG GIỚI HẠN, BẢO ĐẢM THƯƠNG MẠI, PHÙ HỢP CHO MỘT MỤC ĐÍCH CỤ THỂ VÀ KHÔNG VI PHẠM QUYỀN SỞ HỮU.
            </Typography>
            <Typography>NGOÀI CÁC ĐIỀU TRÊN, GAT KHÔNG BẢO ĐẢM HAY ĐẠI DIỆN CHO</Typography>
            <Typography>
              (I) TRANG WEB VÀ BẤT CỨ PHẦN MỀM CÓ THỂ TẢI VỀ, NỘI DUNG, DỊCH VỤ, HOẶC ỨNG DỤNG KHẢ DỤNG CÙNG VỚI HOẶC QUA TRANG WEB SẼ KHÔNG BỊ GIÁN ĐOẠN HOẶC LỖI, CÁC KHUYẾT ĐIỂM SẼ ĐƯỢC SỬA CHỮA, 
              HOẶC CÁC TRANG WEB VÀ BẤT CỨ PHẦN MỀM CÓ THỂ TẢI VỀ, NỘI DUNG, DỊCH VỤ, 
              HOẶC ỨNG DỤNG KHẢ DỤNG CÙNG VỚI HOẶC QUA MÁY CHỦ TẠO RA CHÚNG KHÔNG BỊ NHIỄM VIRUS HAY CÁC THÀNH PHẦN G Y HẠI KHÁC, HOẶC
            </Typography>
            <Typography>
              (II) VIỆC SỬ DỤNG TRANG WEB VÀ BẤT KỲ PHẦN MỀM CÓ THỂ TẢI VỀ, NỘI DUNG, DỊCH VỤ, HOẶC ỨNG DỤNG KHẢ DỤNG CÙNG VỚI HOẶC QUA TRANG WEB TRÊN ĐIỀU KHOẢN LÀ ĐÚNG ĐẮN, TIN CẬY. 
              TÀI LIỆU HAY DỮ LIỆU BẠN TẢI HOĂC QUA TRANG WEB DO BẠN CHỊU MỌI RỦI RO. BẠN ĐỒNG THỜI CHỊU TRÁCH NHIỆM CHO BẤT CỨ TỔN HẠI CHO MÁY TÍNH CỦA BẠN HOẶC MẤT DỮ LIỆU DO VIỆC TẢI XUỐNG TÀI LIỆU HAY DỮ LIỆU ĐÓ. 
              MỘT SỐ LUẬT NHÀ NƯỚC KHÔNG CHO PHÉP GIỚI HẠN VỀ NGỤ Ý BẢO ĐẢM HOẶC LOẠI TRỪ HOẶC GIỚI HẠN CỦA TỔN HẠI NÀO ĐÓ. NẾU NHỮNG LUẬT ĐÓ ÁP DỤNG CHO BẠN, MỘT SỐ HOẶC TẤT CẢ CÁC BÁC BỎ, 
              LOẠI TRỪ HOẶC GIỚI HẠN ĐƯỢC QUY ĐỊNH TRONG CÁC ĐIỀU KHOẢN CÓ THỂ KHÔNG ÁP DỤNG CHO BẠN, VÀ BẠN CÓ THỂ CÓ QUYỀN BỔ SUNG.
            </Typography>
            <Typography>TỪ BỎ VÀ PHÁT HÀNH</Typography>
            <Typography>
              Bạn thừa nhận rằng GAT không phải một tủ sách mà dịch vụ bạn đang sử dụng của GAT được cung cấp bởi các người dùng của GAT. 
              GAT không chịu trách nhiệm về chất lượng hay bất kỳ vấn đề gì xảy ra trong quá trình bạn tham gia vào các hoạt động đó. 
              Bao gồm: tổn hại hay những rủi ro khi tham gia mượn sách. 
              Bằng cách đăng ký trở thành thành viên GAT, bạn thừa nhận và đồng ý, thay mặt cho chính mình, những người thừa kế của mình, đại diện cá nhân và/hoặc cho rằng bạn nhận thức được những rủi ro này bao gồm, nhưng không giới hạn, thiệt hại tài sản. 
              Bạn thừa nhận rằng một số những rủi ro không thể được loại bỏ và đặc biệt là nguy cơ thương tích hoặc gây tổn hại. 
              Bạn thừa nhận và đồng ý rằng đó là trách nhiệm của bạn để tham khảo ý kiến bác sĩ chăm sóc chính của bạn trước khi tham gia và để xác định và làm thế nào tham gia vào bất kỳ lớp hoặc dịch vụ phù hợp với bạn. 
              Bạn cũng hiểu và đồng ý rằng thông tin trong trang web này được thiết kế cho mục đích thông tin, giáo dục và giải trí. 
              Việc sử dụng bất kỳ thông tin được cung cấp trên trang web thuộc về trách nhiệm của bạn.
            </Typography>
            <Typography>
              Do đó, trong phạm vi pháp luật cho phép, bạn giữ và đảm bảo cho GAT, công ty mẹ, công ty con hoặc đơn vị trực thuộc, và cán bộ tương ứng, giám đốc, thành viên, nhân viên, chuyên gia tư vấn, nhân viên hợp đồng, đại diện và đại lý của họ, 
              kế vị tương ứng và chuyển nhượng, vô hại trước trách nhiệm, khiếu nại, phù hợp với, thủ tục, chi phí, 
              thiệt hại và các khoản nợ phát sinh từ hoặc trong bất cứ cách nào liên quan đến việc bạn tham gia làm người dùng GAT, bao gồm liên quan đến thương tích, gây tổn hại về thể chất, bệnh tật, tử vong hoặc thiệt hại tài sản có.
            </Typography>
            <Typography>GIỚI HẠN TRÁCH NHIỆM VÀ THIỆT HẠI</Typography>
            <Typography>
              TRONG MỌI TRƯỜNG HỢP GAT KHÔNG CHỊU TRÁCH NHIỆM CHO BẤT CỨ TỔN HẠI ĐẶC BIỆT, GIÁN TIẾP, HOẶC THEO TRÁCH NHIỆM PHÁP LÝ NGAY CẢ KHI GAT ĐÃ ĐƯỢC KHUYÊN VỀ KHẢ NĂNG CỦA TỔN HẠI NHƯ VẬY. 
              LUẬT ÁP DỤNG CÓ THỂ KHÔNG CHO PHÉP GIỚI HẠN HOẶC LOẠI TRỪ TRÁCH NHIỆM HOẶC THIỆT HẠI NGẪU NHIÊN HAY, LOẠI TRỪ GIỚI HẠN CÓ THỂ KHÔNG ÁP DỤNG VỚI BẠN. 
              TRONG TRƯỜNG HỢP ĐÓ, TRÁCH NHIỆM GAT SẼ ĐƯỢC GIỚI HẠN TRONG PHẠM VI CHO PHÉP CỦA LUẬT PHÁP
            </Typography>
            <Typography>CÁC ĐIỀU KHOẢN KHÁC</Typography>
            <Typography>Quy định pháp luật</Typography>
          </Box>
          <Box className={classes.contentItem}>
            <Typography>Toàn bộ các điều khoản sẽ tuân theo quy định pháp luật Việt Nam hiện hành.</Typography>
            <Typography>Quyền chuyển giao</Typography>
          </Box>
          <Box className={classes.contentItem}>
            <Typography>Chúng tôi có thể chuyển giao các quyền và nghĩa vụ của chúng tôi theo các Điều khoản này. Các điều khoản này sẽ có hiệu lực Người tiếp nhận chuyển giao từ chúng tôi.</Typography>
            <Typography>Tiêu đề</Typography>
          </Box>
          <Box className={classes.contentItem}>
            <Typography>
              Các tài liệu tham khảo đề ở đây là dành cho mục đích thuận tiện, không cấu thành một phần của Điều khoản này, và sẽ không được coi là hạn chế hoặc ảnh hưởng đến bất kỳ các quy định của Quy chế này.
            </Typography>
            <Typography>Khiếu nại; Giới hạn</Typography>
          </Box>
          <Box className={classes.contentItem}>
            <Typography>
              BẠN VÀ GAT ĐỒNG Ý RẰNG BẤT KỲ NGUYÊN NH N KHỞI TỐ PHÁT SINH BÊN NGOÀI HOẶC LIÊN QUAN ĐẾN NHỮNG ĐIỀU KHOẢN HOẶC TRANG WEB PHẢI BẮT ĐẦU TRONG VÒNG MỘT 
              (1) NĂM SAU KHI NGUYÊN NH N CỦA KHỞI TỐ XẢY RA HOẶC LÀ, NGUYÊN NH N KHỞI TỐ ĐÓ BỊ CẤM VĨNH VIỄN.
            </Typography>
            <Typography>Quyền từ bỏ</Typography>
          </Box>
          <Box className={classes.contentItem}>
            <Typography>
              Việc từ bỏ bất kỳ các điều khoản GAT không bị ràng buộc trừ khi được phép bằng văn bản của Ban Quản Trị của GAT. 
              Trong trường hợp GAT khước từ sự vi phạm bất kỳ điều khoản nào, sự từ bỏ đó sẽ không được hiểu như là từ bỏ việc tiếp tục các hành vi vi phạm khác 
              có cùng tính chất hoặc các quy định khác của Điều khoản và sẽ không ảnh hưởng đến quyền của GAT để thực thi tại một cùng thời gian sau đó.
            </Typography>
          </Box>
        </Box>
			</Paper>
		</TabPanel>
  );
};

export default TermAndPrivacy;

TermAndPrivacy.propTypes = {
  selectedTab: PropTypes.number,
};

const useStyles = makeStyles(theme => ({
	root: {
    padding: theme.spacing(3),
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    borderRadius: 10,
    [theme.breakpoints.down("xs")]: {
      borderRadius: 0,
      padding: theme.spacing(3.25, 2)
    },
  },
  title: {
    marginBottom: theme.spacing(3),
    fontSize: "20px",
    lineHeight: "24px",
    fontWeight: 500,
    letterSpacing: "0.15px"
  },
  textBold: {
    fontWeight: "700 !important",
    [theme.breakpoints.down("xs")]: {
      fontWeight: "400 !important"
    }
  },
  contentItem: {
    "&:not(:last-child)": {
      marginBottom: theme.spacing(4),
    },
    "&>*": {
      fontSize: "18px",
      lineHeight: "28px",
      fontWeight: 400,
      textAlign: "justify",
      color: "#000",
      [theme.breakpoints.down("xs")]: {
        fontSize: "16px",
        lineHeight: "22px",
        textAlign: "justify",
      }
    }
  }
}));
