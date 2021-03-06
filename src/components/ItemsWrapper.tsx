import React from 'react';
import { useDrop } from 'react-dnd';
import { ITEM_TYPE, ItemsWrapperProps } from '../utils/types';
import ItemComponent from './ItemComponent';
import { connect } from 'react-redux';
import { updateItem } from '../redux/items';
import { MoveItProps } from '../utils/types';

const ItemsWrapper: React.FC<ItemsWrapperProps> = ({
    onDropItem,
    columnId,
    items,
    updateItem,
}) => {
    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        drop: (item, monitor) => {
            onDropItem(item, monitor, columnId);
        },
    });

    const moveItem = (dragIndex: number, hoverIndex: number, item: any) => {
        updateItem({ dragIndex, hoverIndex, item });
    };

    return (
        <div ref={drop} className="item-wrapper">
            {items.map((item, idx) => {
                if (item.columnId === columnId) {
                    return (
                        <ItemComponent
                            key={idx}
                            item={item}
                            index={idx}
                            moveIt={moveItem}
                            columnId={columnId}
                        />
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    items: state.items,
});

const mapDispatchToProps = (dispatch: any) => ({
    updateItem: (data: MoveItProps) => dispatch(updateItem(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsWrapper);
