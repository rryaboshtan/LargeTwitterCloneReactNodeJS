import React from 'react';
import { Divider, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { useHomeStyles } from '../pages/Home/theme';
import { useSelector } from 'react-redux';
import { selectIsTagsLoaded, selectTagsItems } from '../store/ducks/tags/selectors';
import { Link } from 'react-router-dom';

interface TagsProps {
    classes: ReturnType<typeof useHomeStyles>;
}

export const Tags: React.FC<TagsProps> = ({ classes }: TagsProps): React.ReactElement | null => {
    const items = useSelector(selectTagsItems);
    const isLoaded = useSelector(selectIsTagsLoaded);

    if (!isLoaded)
        return null;

    return (
        <Paper className={classes.rightSideBlock} elevation={0}>
            <Paper className={classes.rightSideBlockHeader} elevation={0}>
                <b>Актуальные темы</b>
            </Paper>
            <List>
                {
                    items.map(obj =>
                        <React.Fragment key={obj._id}>
                            <ListItem className={classes.rightSideBlockItem}>
                                <Link to = { `/home/search?q=${obj.name}`}>
                                    <ListItemText
                                        primary={obj.name}
                                        secondary={
                                            <Typography component="span" variant="body2">
                                                Твитов: {obj.count}
                                            </Typography>
                                        }
                                    />
                                </Link>
                            </ListItem>
                            <Divider />

                        </React.Fragment>
                    )
                }
            </List>
        </Paper>
    );
}